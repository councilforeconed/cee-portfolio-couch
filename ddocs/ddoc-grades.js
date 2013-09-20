var couchapp = require('couchapp');
var path = require('path');

ddoc = { _id:'_design/grades' };

ddoc.rewrites = [
  {from: "../", to: "index.html"},
]

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
          if (grade !== "College") emit(grade, doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-grade-then-economics-standard" : {
    map: function (doc) {
      if (doc.grades.length > 0 && doc.grades[0] !== "") {
        doc.grades.forEach(function (grade) {
          doc.economicsStandards.forEach(function (standard) {
            emit([grade, standard], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "count-grade-then-personal-finance-standard" : {
    map: function (doc) {
      if (doc.grades.length > 0 && doc.grades[0] !== "") {
        doc.grades.forEach(function (grade) {
          doc.personalFinanceStandards.forEach(function (standard) {
            emit([grade, standard], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "count-grade-then-format" : {
    map: function (doc) {
      if (doc.grades.length > 0 && doc.grades[0] !== "") {
        doc.grades.forEach(function (grade) {
          if (grade !== "College") emit([doc.format, grade], doc)
        });
      }
    },
    reduce: "_count"
  }
};

// ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
//   if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -doc) {
//     throw "Only admin can delete documents on this database.";
//   } 
// }

module.exports = ddoc;

couchapp.loadAttachments(ddoc, path.join(__dirname, '_grades'));