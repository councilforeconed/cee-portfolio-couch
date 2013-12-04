App.PublicationRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/publications/_list/lessons/lessons?start_key=' + params.publication_id + '&end_key=' + params.publication_id);
  },
});