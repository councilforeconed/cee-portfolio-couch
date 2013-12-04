Ember.Handlebars.helper('standardName', function(subject, standard) {
  subject = subject.dasherize();
  if (subject === "common-core") return standard;
  return standard.toString() + " - " + App.StandardsList.get(subject)[standard - 1].topic;
});