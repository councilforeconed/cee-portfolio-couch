var couchapp = require('couchapp');
var path = require('path');

ddoc = {
  _id:'_design/app',
  rewrites : [ 
    {from:"/", to:'index.html'},
    {from:"/api", to:'../../'},
    {from:"/api/*", to:'../../*'},
    {from:"/*", to:'*'}
  ]
};

ddoc.views = {};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'application'));
module.exports = ddoc;