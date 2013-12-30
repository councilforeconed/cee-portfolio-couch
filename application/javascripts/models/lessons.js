Portfolio.Lessons = Ember.Object.create({
  find: function () {
    Ember.$.getJSON('http://localhost:3000/api/_design/app/_list/resources/content')
      .then(function (lessons) { return lessons.rows; });
  }
});