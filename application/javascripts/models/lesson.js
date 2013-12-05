Portfolio.Lesson = Ember.Object.extend({
  _id: null,
  id: function () {
    return this.get('_id');
  }.property('id')
});