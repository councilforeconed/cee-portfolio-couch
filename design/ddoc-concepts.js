var couchapp = require('couchapp');

ddoc = { _id:'_design/concepts' };

ddoc.views = {
  "concepts": {
    map: function (doc) {
      if (doc.portfolio) doc.concepts.forEach(function (concept) { emit(concept, doc); });
    }
  }
}

ddoc.lists = {
  "lesson-by-concept": function (doc, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var concepts = [];
    
    var row;
    while (row = getRow()) {
      concepts.push({
        id: row.value._id,
        title: row.value.title,
        publication: {
          id: row.value.publicationID,
          title: row.value.source
        },
        year: row.value.year,
        concept: row.key
      })
    }
    
    send(JSON.stringify(concepts));
  },
};

module.exports = ddoc;
