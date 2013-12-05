Portfolio.LessonsIndexRoute = Ember.Route.extend({
  model: function (params) {
    return Portfolio.Lessons.find(params);
  },
  renderTemplate: function(controller, model) {
    this.render('lessons', { into: 'application', controller: controller});
  }
});

Portfolio.LessonsIndexRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectStandardRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectStandardGradeRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectStandardFormatRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectStandardGradeFormatRoute = Portfolio.LessonsIndexRoute.extend({});
Portfolio.LessonsSubjectStandardGradeFormatTypeRoute = Portfolio.LessonsIndexRoute.extend({});