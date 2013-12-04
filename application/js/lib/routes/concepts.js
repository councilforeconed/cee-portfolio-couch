App.ConceptsIndexRoute = Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON('api/_design/concepts/_list/unique-concepts/concepts')
  }
});