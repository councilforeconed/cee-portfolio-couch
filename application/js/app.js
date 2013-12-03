App = Ember.Application.create();

Ember.Router.map(function () {
  this.resource('publications', function () {
    this.resource('publication', { path: ':publication_id' });
  });
  
  this.resource('lessons', function () {
    this.resource('lessonSubject', { path: ':subject' }, function () {
      this.resource('lessonSubjectFormat', { path: ':format'}, function () {
        this.resource('lessonSubjectFormatGrades', { path: ':grades' });
      });
    });
    this.resource('lesson', { path: ':lesson_id' });
  });
  
  this.resource('discussion', function () {
    this.route('ratings');
    this.route('comments');
  });
});