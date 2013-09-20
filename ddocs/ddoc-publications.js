var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      emit(doc.source, doc);
    },
    reduce: "_count"
  },
  "publications-economics-standards": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "publications-personal-finance-standards": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([doc.source, standard], doc)
      });
    },
    reduce: "_count"
  },
  "economics-standards-publications": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "personal-finance-standards-publications": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([standard, doc.source], doc)
      });
    },
    reduce: "_count"
  },
  "count-format": {
    map: function (doc) {
      emit(doc.format, doc)
    },
    reduce: "_count"
  },
  "student-targetted-lessons": {
    map: function(doc) {
      if (doc.audience === 'student' && doc.format === "print") emit({_id: doc._id, _rev: doc._rev}, null);
    }
  }
};

// ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
//   if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -doc) {
//     throw "Only admin can delete documents on this database.";
//   } 
// }

module.exports = ddoc;