Portfolio.Lessons = Ember.Object.create({
  find: function (params) {
    var response;
    
    // Return all of the lessons in the database if no parameters are provided.
    if (params) {
      if (params.standard) params.standard = parseInt(params.standard, 10);
    
      var keys = [];
      ['subject', 'standard', 'grade', 'format', 'type'].forEach(function (param) {
        if (params[param]) keys.push(params[param]);
      });
    
      var startKey = JSON.stringify(keys);
      if (keys.length < 5) keys.push({});
      var endKey = JSON.stringify(keys);
    
      var query = 'http://localhost:3000/api/_design/app/_view/standard?start_key=' + startKey + '&end_key=' + endKey;
      response = Ember.$.getJSON(query);
    } else {
      response =  Ember.$.getJSON('api/_design/app/_view/content');
    }
    
    return response.then(function (lessons) {
      return lessons.rows.map(function (lesson) {
        return Portfolio.Lesson.create(lesson.value);
      });
    });
  },
  lesson: function (identifier) {
    return Ember.$.getJSON('api/' + identifier).then(function (lesson) {
      return Portfolio.Lesson.create(lesson);
    })
  }
});