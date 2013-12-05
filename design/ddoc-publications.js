var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      var publication = doc.publicationID || "econedlink";
      if (doc.portfolio) emit([publication, doc.source], doc);
    },
    reduce: "_count"
  },
  "publications-economics-standards": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        if (doc.portfolio) emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "publications-personal-finance-standards": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        if (doc.portfolio) emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "economics-standards-publications": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        if (doc.portfolio) emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "personal-finance-standards-publications": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        if (doc.portfolio) emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "count-format": {
    map: function (doc) {
      if (doc.portfolio) if (!doc.dead) emit(doc.format, doc)
    },
    reduce: "_count"
  },
  "student-targetted-lessons": {
    map: function(doc) {
      if (doc.audience === 'student' && doc.format === "print" && doc.portfolio) emit({_id: doc._id, _rev: doc._rev}, null);
    }
  },
  "lessons": {
    map: function(doc) {
      var publication = doc.publicationID || 'econedlink';
      if (doc.portfolio) emit(publication, doc);
    }
  }
};

ddoc.lists = {
  "publications": function (doc, req) {
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
  "publication": function (doc, req) {
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
    
    if (publication.title === "EconEdLink") publication.url = "http://www.econedlink.org";
    
    send(JSON.stringify(publication));
  }
};

module.exports = ddoc;