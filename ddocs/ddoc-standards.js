var couchapp = require('couchapp');

ddoc = { _id:'_design/standards' };

ddoc.views = {
  "by-standard-economics": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          emit(standard, doc);
        });
      }
    }
  },
  "by-standard-personal-finance": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, doc);
        });
      }
    }
  },
  "by-standard-economics-then-grade": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            emit([standard, grade], doc)
          });
        });
      }
    }
  },
  "by-standard-personal-finance-then-grade": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            emit([standard, grade], doc)
          });
        });
      }
    }
  },
  "by-standard-economics-then-grade-print": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "print") {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
  },
  "by-standard-personal-finance-then-grade-print": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "print") {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
  },
  "by-standard-economics-then-grade-online": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "online") {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
  },
  "by-standard-personal-finance-then-grade-online": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "online") {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
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
  "count-economics-print": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "print") {
        doc.economicsStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-print": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "print") {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "count-economics-online": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "online") {
        doc.economicsStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-online": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "online") {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(standard, 1);
        });
      }
    },
    reduce: "_count"
  },
  "count-economics-then-grade": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade !== "") emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-then-grade": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade !== "") emit([standard, grade], 1)
          });
        });
      }
    },
    reduce: "_count"
  },
  "print-no-economics-standards": {
    map: function (doc) {
      if (doc.economicsStandards.length === 0 && doc.format === "print") {
        emit(doc._id, doc);
      }
    }
  },
  "print-no-personal-finance-standards": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length === 0 && doc.format === "print") {
        emit(doc._id, doc);
      }
    }
  },
  "print-no-standards": {
    map: function (doc) {
      if (doc.standards.length === 0 && doc.format === "print") {
        emit(doc._id, doc);
      }
    }
  },
  "online-no-economics-standards": {
    map: function (doc) {
      if (doc.economicsStandards.length === 0 && doc.format === "online") {
        emit(doc._id, doc);
      }
    }
  },
  "online-no-personal-finance-standards": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length === 0 && doc.format === "online") {
        emit(doc._id, doc);
      }
    }
  },
  "online-no-standards": {
    map: function (doc) {
      if (doc.standards.length === 0 && doc.format === "online") {
        emit(doc._id, doc);
      }
    }
  },
  "all-no-economics-standards": {
    map: function (doc) {
      if (doc.economicsStandards.length === 0) {
        emit(doc._id, doc);
      }
    }
  },
  "all-no-personal-finance-standards": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length === 0) {
        emit(doc._id, doc);
      }
    }
  },
  "all-no-standards": {
    map: function (doc) {
      if (doc.standards.length === 0) {
        emit(doc._id, doc);
      }
    }
  },
  "count-by-economics-standard-then-grade-then-format": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade, doc.format], 1);
          });
        });
      }
    },
    reduce: "_count"
  },
  "count-by-personal-finance-standard-then-grade-then-format": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([standard, grade, doc.format], 1);
          });
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