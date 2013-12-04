Ember.Handlebars.helper('standardsLink', function(standard, type) {
  return new Handlebars.SafeString('<a href="#/standards/' + type.dasherize() + '/' + standard + '">' + standard + '</a>')
});