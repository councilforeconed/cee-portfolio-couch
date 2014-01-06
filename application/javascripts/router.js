Portfolio.Router.map(function () {
  this.resource('lessons', { path: '/'}, function () {
    this.route('new', { path: '/new' });
    this.route('edit', { path: '/:id' });
  });
});