var couchapp = require('couchapp');

ddoc = { _id:'_design/standards' };

ddoc.views = {
  "by-standard-economics": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    }
  },
  "by-standard-personal-finance": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0) {
        doc.personalFinanceStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    }
  },
  "by-standard-economics-then-grade": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (doc.portfolio) emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio) emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio && grade) emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio && grade) emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio && grade && doc.type === "lesson") emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio && grade) emit([parseInt(standard), grade], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "by-standard-economics-then-grade-interactive": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.type === "interactive") {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([parseInt(standard), grade], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "by-standard-personal-finance-then-grade-interactive": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.type === "interactive") {
        doc.personalFinanceStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (grade) emit([parseInt(standard), grade], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "count-economics": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.audience !== "student") {
        doc.economicsStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.audience !== "student") {
        doc.personalFinanceStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-economics-print": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "print" && doc.audience === "teacher") {
        doc.economicsStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-print": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "print" && doc.audience === "teacher") {
        doc.personalFinanceStandards.forEach(function (standard) {
          if (doc.portfolio) emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-economics-online": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "online") {
        doc.economicsStandards.forEach(function (standard) {
          emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-online": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "online") {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-economics-interactive": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0 && doc.format === "online" && doc.type === "interactive") {
        doc.economicsStandards.forEach(function (standard) {
          emit(parseInt(standard), doc);
        });
      }
    },
    reduce: "_count"
  },
  "count-personal-finance-interactive": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length > 0 && doc.format === "online" && doc.type === "interactive") {
        doc.personalFinanceStandards.forEach(function (standard) {
          emit(parseInt(standard), doc);
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
            emit([parseInt(standard), grade], doc)
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
            if (doc.portfolio && grade !== "") emit([parseInt(standard), grade], doc)
          });
        });
      }
    },
    reduce: "_count"
  },
  "print-no-economics-standards": {
    map: function (doc) {
      if (doc.economicsStandards.length === 0 && doc.format === "print") {
        if (doc.portfolio) emit(doc._id, doc);
      }
    }
  },
  "print-no-personal-finance-standards": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length === 0 && doc.format === "print") {
        if (doc.portfolio) emit(doc._id, doc);
      }
    }
  },
  "print-no-standards": {
    map: function (doc) {
      if (doc.standards.length === 0 && doc.format === "print") {
        if (doc.portfolio) emit(doc._id, doc);
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
        if (doc.portfolio) emit(doc._id, doc);
      }
    }
  },
  "all-no-personal-finance-standards": {
    map: function (doc) {
      if (doc.personalFinanceStandards.length === 0) {
        if (doc.portfolio) emit(doc._id, doc);
      }
    }
  },
  "all-no-standards": {
    map: function (doc) {
      if (doc.standards.length === 0) {
        if (doc.portfolio) emit(doc._id, doc);
      }
    }
  },
  "count-by-economics-standard-then-grade-then-format": {
    map: function (doc) {
      if (doc.economicsStandards.length > 0) {
        doc.economicsStandards.forEach(function (standard) {
          doc.grades.forEach(function (grade) {
            if (doc.portfolio && grade) emit([parseInt(standard), grade, doc.format], doc);
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
            if (doc.portfolio && grade) emit([parseInt(standard), grade, doc.format], doc);
          });
        });
      }
    },
    reduce: "_count"
  }
};

ddoc.lists = {
  'count-lessons-by-standard-by-grade': function (head, request) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var rows = {};
    
    var row;
    while (row = getRow()) {
      
      var standard = row.key[0];
      var grades = row.key[1];
      var lessons = row.value;
      
      if (!rows[standard]) {
        rows[standard] = {
          "K-2": 0,
          "3-5": 0,
          "6-8": 0,
          "9-12": 0
        };
      } else {
        rows[standard][grades] = lessons;
      }
    }
    
    var response = [];
    for (standard in rows) {
      if (rows.hasOwnProperty(standard)) {
        rows[standard].standard = standard
        response.push(rows[standard])
      }
    }
    
    send(JSON.stringify(response));
  }
};

module.exports = ddoc;