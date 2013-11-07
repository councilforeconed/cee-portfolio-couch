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

ddoc.templates = couchapp.loadFiles('./templates');
ddoc.modules = {
  underscore: couchapp.loadFiles('./node_modules/underscore'),
  mustache: couchapp.loadFiles('./node_modules/mustache')
}

ddoc.views = {};

ddoc.shows = {
  
  lesson: function (doc, req) {
    //!json templates.lesson
    var Mustache = require("modules/mustache/mustache");
    return Mustache.to_html(templates.lesson, {title: doc.title});
  }
}

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));
module.exports = ddoc;