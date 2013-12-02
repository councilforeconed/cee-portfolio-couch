this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div id=\"wrap\">\n  <div class=\"container\">\n    \n    <section class=\"page-header\">\n      <h1 class=\"title\">Council for Economic Education</h1>\n      <p class=\"lead\">Program Portfolio</p>\n    </section><!-- /.page-header -->\n    \n    ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    \n  </div><!-- /.container -->\n</div><!-- /#wrap -->\n  \n<div id=\"footer\">\n  <div class=\"container\">\n    <p class=\"text-muted credit\">&copy; 2013 Council for Economic Education</p>\n  </div>\n</div>");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"row\">\n  <div class=\"col-md-12\">\n    <p>This is the index page.</p>\n  </div>\n</div>");
  
});