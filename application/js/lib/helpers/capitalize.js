Ember.Handlebars.helper('capitalize', function(value, options) {
  return value.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3').replace(/^./, function(str){ return str.toUpperCase(); });
});