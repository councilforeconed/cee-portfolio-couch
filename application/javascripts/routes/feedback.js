Portfolio.FeedbackRoute = Ember.Route.extend({
  model: function (params) {
    return Portfolio.Lessons.loadLessons().then(function () {
      return Ember.$.getJSON('/api/_design/app/_view/feedback').then(function (resp) {
        return resp.rows.map(function (row) {
          var comment = row.value;
          comment.lesson = _.findWhere(Portfolio.Lessons.lessons, { id: comment.lesson.toString() });
          return comment;
        });
      });
    });
  },
  actions: {
    willTransition: function () {
      $('.feedback').hide();
    },
  }
});