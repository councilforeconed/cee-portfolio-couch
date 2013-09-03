var couchapp = require('couchapp');

ddoc = { _id:'_design/standards' };

ddoc.views = {
  "economics": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          emit(standard, doc);
        });
      }
    }
  },
  "personal-finance": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, doc);
        });
      }
    }
  },
  "economics-count": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "personal-finance-count": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
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