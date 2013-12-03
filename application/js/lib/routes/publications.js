App.PublicationsIndexRoute = Ember.Route.extend({
  model: function () {
    return Ember.$.getJSON('api/_design/publications/_view/publications?group_level=2')
      .then(function (response) {
        return response.rows;
      });
  }
});

App.PublicationRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/publications/_view/lessons-by-publication?start_key=' + params.publication_id + '&end_key=' + params.publication_id)
      .then(function (response) {
        return response.rows;
      });
  }
})