Portfolio.Lessons = Ember.Object.create({
  find: function (params) {
    
    // Return an empty array if passed no arguments or an empty object.
    if (!params || !Object.keys(params).length) return [];
    
    // Ember passes parameters from routes in as strings.
    // Couch expects an integer.
    if (params.standard) params.standard = parseInt(params.standard, 10);
  
    var keys = [];
    ['subject', 'standard', 'grade', 'format', 'type'].forEach(function (param) {
      if (params[param]) keys.push(params[param]);
    });
  
    var startKey = JSON.stringify(keys);
    if (keys.length < 5) keys.push({});
    var endKey = JSON.stringify(keys);
  
    var query = 'http://localhost:3000/api/_design/app/_view/standard?start_key=' + startKey + '&end_key=' + endKey;
    
    Ember.$.getJSON(query).then(function (lessons) {
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