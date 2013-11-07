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
};

module.exports = ddoc;