Portfolio.LoadingRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('loading', {
      outlet: 'loading',
      into: 'application'
    });
  }
});