var couchapp = require('couchapp');
var path = require('path');

var design = { _id:'_design/app' };

design.rewrites = [
  {from:'/', to:'index.html'},
  {from:'/api', to:'../../'},
  {from:'/api/', to:'../../*'},
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
  grade: {
    map: function (doc) {
      if (doc.portfolio) {
        doc.grades.forEach(function (grade) {
          emit(grade, doc);
        });
      }
    }
  },
  concepts: {
    map: function (doc) {
      if (doc.portfolio && doc.concepts && doc.concepts.length) {
        doc.concepts.forEach(function (concept) {
          emit(concept, doc);
        });
      }
    }
  },
  standard: {
    map: function () {
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

couchapp.loadAttachments(design, path.join(__dirname, 'application'));
module.exports = design;