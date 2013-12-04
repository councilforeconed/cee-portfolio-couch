App.ConceptRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/concepts/_list/lesson-by-concept/concepts?start_key=%22' + params.concept_id + '%22&end_key=%22' + params.concept_id + '%22');
  },
  renderTemplate: function(controller, model) {
    this.render('lessons', { into: 'application' });
  },
  setupController: function(controller, model) {
    controller.set('title', "Lessons Covering " + model[0].concept);
    controller.set('model', model);
  }
});