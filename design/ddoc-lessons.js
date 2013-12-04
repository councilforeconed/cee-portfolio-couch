var couchapp = require('couchapp');
var path = require('path');

ddoc = { _id:'_design/lessons' };

ddoc.views = {
  "online": {
    map: function (doc) {
      if (doc.format === "online") emit(doc._id, doc);
    }
  },
  "print": {
    map: function (doc) {
      if (doc.format === "print") emit(doc._id, doc);
    }
  },
  "econedlink-interactves": {
    map: function (doc) {
      if (doc.source === "EconEdLink" && doc.type === "interactive") emit(doc._id, doc);
    }
  },
  "econedlink-lessons": {
    map: function (doc) {
      if (doc.source === "EconEdLink" && doc.type === "interactive") emit(doc._id, doc);
    }
  },
  "dead": {
    map: function (doc) {
      if (doc.dead) emit(doc._id, doc);
    }
  },
  "alive": {
    map: function (doc) {
      if (!doc.dead && doc.portfolio) emit(doc._id, doc);
    }
  },
};

ddoc.lists = {
  "lessons": function (doc, req) {
    start({"headers":{"Content-Type" : "application/json; charset=utf-8"}});
    
    var lessons = [];
    
    var row;
    while (row = getRow()) {
      lessons.push({
        id: row.key,
        title: row.value.title,
        publication: {
          id: row.value.publicationID,
          title: row.value.source,
        },
        year: row.value.year,
        concepts: row.value.concepts,
        standards: {
          economics: row.value.economicsStandards,
          personalFinance: row.value.personalFinanceStandards,
          commonCore: row.value.commonCoreStandards
        }
      });
    }
    
    send(JSON.stringify(lessons));
  },
};

module.exports = ddoc;