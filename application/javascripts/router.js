Portfolio.Router.map(function () {
  this.resource('lessons', { path: '/'}, function () {
    this.resource('lesson', {path: ':id'});
  });
});