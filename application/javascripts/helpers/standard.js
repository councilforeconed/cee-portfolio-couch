Ember.Handlebars.helper('standardName', function(subject, c, o) {
  var standard = o.contexts[1]
  return o.contexts[1] + ' - ' + Portfolio.Standards[subject][standard - 1].topic;
});