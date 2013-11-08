var couchapp = require('couchapp');

ddoc = { _id:'_design/standards' };

ddoc.modules = couchapp.loadFiles('./common');

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
  "standards-by-grade": function (doc, req) {
    var _ = require('modules/underscore');
    var Mustache = require('modules/mustache');
    
    var template = '<div class="lesson-in-modal" data-lesson={{_id}}>' +
                      ' <strong>{{title}}</strong>,' +
                      ' <a href="{{url}}">{{source}}</a>' +
                      ' {{#year}}<span class="label label-info">{{year}}</span>{{/year}}' +
                      ' {{#type}}<span class="label label-info">{{type}}</span>{{/type}}' +
                      ' {{#id}}<span class="label label-warning">{{id}}</span>{{/id}}' +
                      ' <div class="comment-buttons">' +
                      ' <a href="#/lesson/{{_id}}/like" class="btn btn-default btn-sm like-{{_id}}"> ' +
                      '   <span class="glyphicon glyphicon-thumbs-up"></span> Like' +
                      ' </a>' +
                      ' <a href="#/lesson/{{_id}}/dislike" class="btn btn-default btn-sm dislike-{{_id}}"> ' +
                      '   <span class="glyphicon glyphicon-thumbs-down"></span> Dislike' +
                      ' </a>' +
                      ' <a href="#/lesson/{{_id}}/miscategorized" class="btn btn-default btn-sm miscategorized-{{_id}}"> ' +
                      '   <span class="glyphicon glyphicon-question-sign"></span> Miscategorized' +
                      ' </a>' +
                      ' <a href="#/lesson/{{_id}}/comment" class="btn btn-default btn-sm comment-{{_id}}"> ' +
                      '   <span class="glyphicon glyphicon-comment"></span> Comment' +
                      ' </a>' +
                      ' </div>' +
                    '</div>'
    
    start({"headers":{"Content-Type" : "text/html; charset=utf-8"}});
    
    var row;
    while (row = getRow()) {
      var lesson = row.value;
        send(Mustache.render(template, lesson));
    }
    
  }
};

module.exports = ddoc;