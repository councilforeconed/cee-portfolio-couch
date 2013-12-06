var couchapp = require('couchapp');
var path = require('path');

var design = { _id:'_design/app' };

design.rewrites = [
  {from:'/', to:'index.html'},
  {from:'/api', to:'../../'},
  {from:'/api/', to:'../../*'},
  {from:'/api/lessons', to:'../../_design/app/_view/content'},
  {from:'/api/lessons/', to:'../../*'},
  {from:'/api/formats', to:'../../_design/app/_view/format'},
  {from:'/api/formats/:formats', to:'../../_design/app/_view/format', query: { start_key: ':format', end_key: ':format' }},
  {from:'/api/types', to:'../../_design/app/_view/type'},
  {from:'/api/types/:types', to:'../../_design/app/_view/type', query: { start_key: ':type', end_key: ':type' }},
  {from:'/api/publications', to:'../../_design/app/_view/publication'},
  {from:'/api/publications/:publication', to:'../../_design/app/_view/publication', query: { start_key: ':publication', end_key: ':publication' }},
  {from:'/api/grades', to:'../../_design/app/_view/grade'},
  {from:'/api/grades/:grade', to:'../../_design/app/_view/grade', query: { start_key: ':grade', end_key: ':grade' }},
  {from:'/api/concepts', to:'../../_design/app/_view/concept'},
  {from:'/api/concepts/:concept', to:'../../_design/app/_view/concept', query: { start_key: ':concept', end_key: ':concept' }},
  {from:'/api/concepts', to:'../../_design/app/_view/concept'},
  {from:'/api/concepts/:concept', to:'../../_design/app/_view/concept', query: { start_key: ':concept', end_key: ':concept' }},
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
        concepts: doc.concepts
      }
      
      lessons.push(doc);
    }
  },
  publications: function (document, req) {
    /// Reimplement reduce view emitting {[publicationID, source]: _count}
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
  }
};

couchapp.loadAttachments(design, path.join(__dirname, 'application'));
module.exports = design;