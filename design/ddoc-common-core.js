var couchapp = require('couchapp');

ddoc = { _id:'_design/common-core' };

ddoc.views = {
  "standards": {
    map: function(doc) {
      if (doc.standard) emit(doc._id, doc);
    }
  },
  "standard-counts": {
    map: function(doc) {
      if (doc.commonCoreStandards) {
        doc.commonCoreStandards.forEach(function (cc) {
          emit(cc, doc);
        });
      }
    },
    reduce: '_count'
  },
  "standard-counts-by-id": {
    map: function(doc) {
      if (doc.commonCoreStandardIdentifiers) {
        doc.commonCoreStandardIdentifiers.forEach(function (cc) {
          emit(cc, doc);
        });
      }
    },
    reduce: '_count'
  },
  'lessons-with-ccss': {
    map: function(doc) {
      if (doc.commonCoreStandardIdentifiers) {
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
  },
  'lessons-for-standard': function (doc, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});

    var lessons = [];

    var row;
    while (row = getRow()) {
      lessons.push({
        id: row.value._id,
        title: row.value.title,
        publication: {
          id: row.value.publicationID,
          title: row.value.source
        },
        year: row.value.year,
        standard: row.key
      })
    }

    send(JSON.stringify(lessons));
  }
};

module.exports = ddoc;
