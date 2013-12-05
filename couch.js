var couchapp = require('couchapp');
var path = require('path');

ddoc = {
  _id:'_design/app',
  rewrites : [ 
    {from:"/", to:'index.html'},
    {from:"/api", to:'../../'},
    {from:"/api/concepts", to: '../../_design/concepts/_list/unique-concepts/concepts'},
    {from:"/api/concepts/:id", to: '../../_design/concepts/_list/lesson-by-concept/concepts', query: {'start_key': ':id', 'end_key': ':id'}},
    {from:"/api/publications", to: '../../_design/publications/_list/publications/publications', query: {'group_level': '2'}},
    {from:"/api/publications/:id", to: '../../_design/publications/_list/publication/lessons', query: {'start_key': ':id', 'end_key': ':id'}, formats: {'id' : 'int'}},
    {from:"/api/standards/common-core/:id", to: 'api/_design/common-core/_list/lessons-for-standard/standard-counts', query: {'start_key': ':id', 'end_key': ':id', 'reduce': 'false'}},
    {from:"/api/standards/:subject/:id", to: '../../_design/standards/_list/lessons-by-standard/:subject', query: {'start_key': ':id', 'end_key': ':id'}, formats: {'id' : 'int'}},
    {from:"/api/", to:'../../*'},
    {from:"/*", to:'*'}
  ]
};

ddoc.views = {
  ratings: {
    map: function (doc) {
      if (doc.type === 'rating') emit(doc.rating, doc);
    }
  }
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'application'));
module.exports = ddoc;