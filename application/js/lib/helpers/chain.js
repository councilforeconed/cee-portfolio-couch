Ember.Handlebars.helper('uncamelizeAndCapitalize', function(value, options) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3').replace(/^./, function(str){ return str.toUpperCase(); });
});

Ember.Handlebars.helper('uncamelizeAndLowerCase', function(value, options) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
});