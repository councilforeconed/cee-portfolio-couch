App.PublicationsIndexRoute = Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON('api/_design/publications/_list/publications/publications?group_level=2')
  }
});