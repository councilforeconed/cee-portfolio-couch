var couchapp = require('couchapp');

ddoc = { _id:'_design/publications' };

ddoc.views = {
  "publications": {
    map: function (doc) {
      emit(doc.source, 1);
    },
    reduce: "_count"
  },
  "publications-economics-standards": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([doc.source, standard], 1)
      });
    },
    reduce: "_count"
  },
  "publications-personal-finance-standards": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([doc.source, standard], 1)
      });
    },
    reduce: "_count"
  },
  "economics-standards-publications": {
    map: function (doc) {
      doc.economicsStandards.forEach(function (standard) {
        emit([standard, doc.source], 1)
      });
    },
    reduce: "_count"
  },
  "personal-finance-standards-publications": {
    map: function (doc) {
      doc.personalFinanceStandards.forEach(function (standard) {
        emit([standard, doc.source], 1)
      });
    },
    reduce: "_count"
  }
};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

module.exports = ddoc;