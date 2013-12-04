App.PublicationController = Ember.ObjectController.extend({
  audience: function () {
    return this.get('model').audience.capitalize();
  }.property('model.audience'),
  language: function () {
    return this.get('model').language.capitalize();
  }.property('model.language'),
});