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
  "keys": {
    map: function (doc) {
      if (doc.key) emit(doc._id, doc);
    }
  }
};

ddoc.modules = {
  underscore: couchapp.loadFiles('../node_modules/underscore')
};

ddoc.shows = {
  lesson: function(doc, req) {
    var _ = require('modules/underscore/underscore-min');
    
    if (doc.portfolio) {
      return '<h1>' + _.isString('object')  + '</h1>';
    }
  }
}

module.exports = ddoc;