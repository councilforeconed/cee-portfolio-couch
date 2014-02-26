Ember.Handlebars.helper('format-rating', function(value, options) {
  if (!value) return;
  if (value === 'like') return new Handlebars.SafeString('<span class="glyphicon glyphicon-thumbs-up"></span>');
  if (value === 'dislike') return new Handlebars.SafeString('<span class="glyphicon glyphicon-thumbs-down"></span>');
  return value;
});