var couchapp = require('couchapp');
var path = require('path');

var design = { _id:'_design/app' };

design.rewrites = [
  {from:'/', to:'index.html'},
  {from:'/api', to:'../../'},
  {from:'/api/', to:'../../*'},
  {from:'/api/*', to:'../../*'},
  {from:'/*', to:'*'}
];

design.views = {
  content: {
    map: function (doc) {
      if (doc.portfolio) emit(null, doc);
    }
  },
  format: {
    map: function (doc) {
      if (doc.portfolio) emit(doc.format, doc);
    }
  },
  type: {
    map: function (doc) {
      if (doc.portfolio) emit(doc.type, doc);
    }
  },
  source: {
    map: function (doc) {
      if (doc.portfolio) emit(doc.source, doc);
    }
  },
  publication: {
    map: function (doc) {
      if (doc.portfolio) emit(doc.publicationID, doc);
    }
  },
  grade: {
    map: function (doc) {
      if (doc.portfolio && doc.grades) {
        doc.grades.forEach(function (grade) {
          emit(grade, doc);
        });
      }
    }
  },
  concept: {
    map: function (doc) {
      if (doc.portfolio && doc.concepts && doc.concepts.length) {
        doc.concepts.forEach(function (concept) {
          emit(concept, doc);
        });
      }
    }
  },
  standard: {
    map: function (doc) {
      if (doc.portfolio) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            emit(['economics', standard, grade, doc.format, doc.type], doc);
          });
        });
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            emit(['personal-finance', standard, grade, doc.format, doc.type], doc);
          });
        });
        if (doc.commonCoreStandards) {
          doc.commonCoreStandards.forEach(function (standard) {
            doc.grades.forEach(function (grade) {
              emit(['common-core', standard, grade, doc.format, doc.type], doc);
            });
          });
        }
      }
    }
  },
  feedback: {
    map: function (doc) {
      if (doc.comment) {
        emit(doc.lesson, doc)
      }
    }
  },
  "feedback-aggregate": {
    map: function (doc) {
      if (doc.comment && doc.type === "rating") {
        var rating = 0;
        if (doc.comment === "like") {
          rating = 1;
        } else if (doc.comment === "dislike") {
          rating = -1;
        }
        emit(doc.lesson, rating);
      }
    },
    reduce: "_sum"
  }
};

design.lists = {
  resources: function (document, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var lessons = [];
    
    var row;
    while (row = getRow()) {
      var doc = row.value;
      
      doc = {
        id: doc._id,
        title: doc.title,
        year: doc.year,
        publication: {
          id: doc.publicationID,
          title: doc.source
        },
        grades: doc.grades,
        url: doc.url,
        format: doc.format,
        type: doc.type,
        standards: {
          economics: doc.economicsStandards,
          personalFinance: doc.personalFinanceStandards,
          commonCore: doc.commonCoreStandards
        },
        concepts: doc.concepts,
      }
      
      if (doc.format === "online") {
        doc.teacherPageviews = parseInt(row.value.teacherPageviews, 10);
        doc.teacherUniques = parseInt(row.value.teacherUniques, 10);
        doc.teacherEntrances = parseInt(row.value.teacherEntrances, 10);
        doc.studentPageviews = parseInt(row.value.studentPageviews, 10);
        doc.studentUniques = parseInt(row.value.studentUniques, 10);
        doc.studentEntrances = parseInt(row.value.studentEntrances, 10);
        doc.datePublished = row.value.datePublished;
      }
      
      if (row.value.subjects) {
        doc.subjects = row.value.subjects;
      }
      
      lessons.push(doc);
    }
    
    send(JSON.stringify(lessons));
  },
  'resources-flat': function (document, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    function normalize(text) {
      if (typeof text === "number") return text;
      return text
        .toLowerCase()
        .replace(/[\s\.]/g, '-')
        .replace(/(-+)([a-zA-Z0-9])/g, function(a,b,c) { return c.toUpperCase(); })
        .replace(/([0-9]+)([a-zA-Z])/g, function(a,b,c) { return b + c.toUpperCase(); })
        .replace(/^(\w)/, function (a) { return a.toUpperCase(); });
    }
    
    var lessons = [];
    
    var row;
    while (row = getRow()) {
      var doc = row.value;
      
      doc = {
        id: doc._id,
        title: doc.title,
        year: doc.year,
        publicationTitle: doc.source,
        publicationID: doc.publicationID,
        url: doc.url,
        format: doc.format,
        type: doc.type,
      };
      
      if (row.value.grades) {
        row.value.grades.forEach(function (grade) {
          doc['grade' + normalize(grade)] = grade;
        });
      }
      
      if (row.value.concepts) {
        row.value.concepts.forEach(function (concept) {
          doc['concept' + normalize(concept)] = concept;
        });
      }
      
      if (row.value.economicsStandards) {
        row.value.economicsStandards.forEach(function (standard) {
          doc['economicsStandard' + normalize(standard)] = standard;
        });
      }
      
      if (row.value.personalFinanceStandards) {
        row.value.personalFinanceStandards.forEach(function (standard) {
          doc['personalFinanceStandard' + normalize(standard)] = standard;
        });
      }
      
      if (row.value.commonCoreStandards) {
        row.value.commonCoreStandards.forEach(function (standard) {
          doc['commonCoreStandard' + normalize(standard)] = standard;
        });
      }
      
      lessons.push(doc);
    }
    
    send(JSON.stringify(lessons));
  },
  publications: function (document, req) {
    /// TODO: Reimplement reduce view emitting {[publicationID, source]: _count}
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var publications = [];
    
    var row;
    while (row = getRow()) {
      var publication = {
        id: row.key[0],
        title: row.key[1],
        lessons: row.value
      }
      
      publications.push(publication);
    }
    
    send(JSON.stringify(publications));
  },
  publication: function (document, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var publication = {
      title: null,
      audience: null,
      isbn: null,
      year: null,
      language: null,
      url: null,
      grades: null,
      format: null,
      lessons: [],
      concepts: [],
      standards: {
        economics: [],
        personalFinance: [],
        commonCore: []
      },
    };
    
    var row;
    while (row = getRow()) {
      
      if (!publication.title) {
        publication.title = row.value.source;
        publication.audience = row.value.audience;
        publication.isbn = row.value.isbn;
        publication.year = row.value.year;
        publication.language = row.value.language;
        publication.url = row.value.url;
        publication.grades = row.value.grades;
        publication.format = row.value.format;
      }
      
      publication.lessons.push({
        id: row.value._id,
        title: row.value.title
      });
      
      row.value.concepts.forEach(function (element) {
        if (publication.concepts.indexOf(element) === -1) publication.concepts.push(element);
      });
      
      row.value.economicsStandards.forEach(function (element) {
        if (publication.standards.economics.indexOf(element) === -1) publication.standards.economics.push(element);
      });
      
      row.value.personalFinanceStandards.forEach(function (element) {
        if (publication.standards.personalFinance.indexOf(element) === -1) publication.standards.personalFinance.push(element);
      });
      
      if (row.value.commonCoreStandards) {
        row.value.commonCoreStandards.forEach(function (element) {
          if (publication.standards.commonCore.indexOf(element) === -1) publication.standards.commonCore.push(element);
        });
      }
    }

    send(JSON.stringify(publication));
  },
  feedback: function (doc, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var ratings = {};
    
    var row;
    while (row = getRow()) {
      ratings[row.key] = row.value;
    }

    send(JSON.stringify(ratings));
  }
};

design.validate_doc_update = function (newDoc, oldDoc, userCtx) {  
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

couchapp.loadAttachments(design, path.join(__dirname, 'application'));
module.exports = design;
