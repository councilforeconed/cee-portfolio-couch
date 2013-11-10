var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      if (doc.portfolio) emit(doc.source, doc);
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
  }
};

ddoc.lists = {};

module.exports = ddoc;