var couchapp = require('couchapp');

ddoc = { _id:'_design/common-core' };

ddoc.views = {
  "standard-counts": {
    map: function(doc) {
      if (doc.commonCoreStandards) {
        doc.commonCoreStandards.forEach(function (cc) {
          emit(cc.match(/^([\w\d\.-]+) -/)[1], 1);
        });
      }
    },
    reduce: '_count'
  },
  "standard-counts-by-id": {
    map: function(doc) {
      if (doc.commonCoreStandardIDs) {
        doc.commonCoreStandardIDs.forEach(function (cc) {
          emit(cc, 1);
        });
      }
    },
    reduce: '_count'
  },
  'lessons-with-ccss': {
    map: function(doc) {
      if (doc.commonCoreStandardIDs) {
        emit(doc._id, doc);
      }
    }
  }
}

ddoc.lists = {
  "lessons": function (doc, req) {
    start({"headers":{"Content-Type" : "application/csv; charset=utf-8"}});
    
    send(['id','title','publication_id','publication','year','format'].join(',') + '\n');
    
    var row;
    while (row = getRow()) {
      var lesson = row.value;
      if (lesson.portfolio) {
        var details = [lesson._id,lesson.title,lesson.publicationID,lesson.source,lesson.year,lesson.format].map(function (el) {
          if (typeof el === 'string') {
            if (el.indexOf(',') === -1) {
              return el;
            } else {
              return '"' + el.replace('"', '\"') + '"';
            }
          } else {
            return el;
          }
        });
        send(details.join(',') + '\n');
      }
    }
    
  }
};

module.exports = ddoc;
