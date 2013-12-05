Ember.Handlebars.helper('standardName', function(subject, standard) {
  return standard.toString() + " - " + Portfolio.Standards.get(subject).get(standard - 1).topic;
});