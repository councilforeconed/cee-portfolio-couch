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
  "count-economics": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "no-economics-standards-for-print": {
    map: function (doc) {
      if (!doc.economicsStandards && doc.format === "print") {
        emit(doc._id, doc);
      }
    }
  }
};

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

module.exports = ddoc;