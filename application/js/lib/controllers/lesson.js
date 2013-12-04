App.LessonController = Ember.ObjectController.extend({
  publicationID: function () {
    return this.get('model.publicationID') || 'econedlink';
  }.property('model.publicationID'),
  isOnline: Ember.computed.equal('format', 'online')
});