App.LessonsIndexRoute = Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON('api/_design/lessons/_list/lessons/alive');
  }
})