App.ConceptRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/concepts/_list/lesson-by-concept/concepts?start_key=%22' + params.concept_id + '%22&end_key=%22' + params.concept_id + '%22');
  },
  setupController: function(controller, model) {
    controller.set('title', model[0].concept);
    controller.set('model', model);
  }
});