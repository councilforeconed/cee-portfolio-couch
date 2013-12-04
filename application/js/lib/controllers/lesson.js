App.LessonController = Ember.ObjectController.extend({
  audience: function () {
    return this.get('model').audience.capitalize() || "N/A";
  }.property('model.audience'),
  format: function () {
    return this.get('model').format.capitalize() || "N/A";
  }.property('model.format'),
  language: function () {
    return this.get('model').language.capitalize() || "N/A";
  }.property('model.language')
});