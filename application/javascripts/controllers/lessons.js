Portfolio.LessonsIndexController = Ember.ArrayController.extend({
  lessonsAtATime: 20,
  startingPosition: 0,
  endingPosition: function () {
    return this.get('startingPosition') + this.get('lessonsAtATime');
  }.property('startingPosition', 'lessonsAtATime'),
  totalLessons: function () {
    return this.content.length;
  }.property(),
  viewableLessons: function () {
    return this.content.slice(this.get('startingPosition'), this.get('lessonsAtATime'));
  }.property('lessonsAtATime'),
  viewableRange: function () {
    var starting = parseInt(this.get('startingPosition'), 10) + 1;
    var ending = parseInt(this.get('endingPosition'), 10) + 1;
    return starting + ' through ' + ending;
  }.property('startingPosition', 'endingPosition')
});