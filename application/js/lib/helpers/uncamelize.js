Ember.Handlebars.helper('uncamelize', function(value, options) {
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
});