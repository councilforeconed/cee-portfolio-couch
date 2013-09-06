var couchapp = require('couchapp');

ddoc = { _id:'_design/grades' };

ddoc.views = {
  "all": {
    map: function (doc) {
      if (doc.grades.length > 0 && doc.grades[0] !== "") {
        doc.grades.forEach(function (grade) {
          emit(grade, doc);
        });
      }
    }
  },
  "K-2": {
    map: function (doc) {
      if (doc.grades.indexOf("K-2") >= 0) emit(doc._id, doc);
    }
  },
  "3-5": {
    map: function (doc) {
      if (doc.grades.indexOf("3-5") >= 0) emit(doc._id, doc);
    }
  },
  "6-8": {
    map: function (doc) {
      if (doc.grades.indexOf("6-8") >= 0) emit(doc._id, doc);
    }
  },
  "9-12": {
    map: function (doc) {
      if (doc.grades.indexOf("9-12") >= 0) emit(doc._id, doc);
    }
  },
  "count": {
    map: function (doc) {
      if (doc.grades.length > 0 && doc.grades[0] !== "") {
        doc.grades.forEach(function (grade) {
          emit(grade, 1);
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