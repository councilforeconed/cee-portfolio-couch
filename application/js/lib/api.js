var api = { 
  
  get: {
    
    grades: function (callback) {
      $.getJSON('api/_design/grades/_view/count?group_level=1', function (response) {
        callback(response.rows);
      });
    },
  
    formats: function (callback) {
      $.getJSON('api/_design/publications/_view/count-format?group_level=1', function (response) {
        callback(response.rows);
      });
    },
    
    publications: function (callback) {
      $.getJSON('api/_design/publications/_view/publications?group_level=2', function (response) {
        callback(response.rows)
      });
    },
    
    standards: function (subject, format, callback) {
      if (format === 'all') {
        $.getJSON('api/_design/standards/_view/count-' + subject + '?group_level=1', function (response) {
          callback(response.rows);
        });
      } else {
        $.getJSON('api/_design/standards/_view/count-' + subject + '-' + format + '?group_level=1', function (response) {
          callback(response.rows);
        });
      }
    },
    
    standardsByGrade: function (subject, format, callback) {
      if (format === 'all') {
        var uri = encodeURI('api/_design/standards/_list/count-lessons-by-standard-by-grade/by-standard-' + subject + '-then-grade?group_level=2');
        $.getJSON(uri, function (response) {
          callback(response);
        });
      } else {
        var uri = 'api/_design/standards/_list/count-lessons-by-standard-by-grade/by-standard-' + subject + '-then-grade-' + format + '?group_level=2';
        $.getJSON(uri, function (response) {
          callback(response);
        });
      }
    },
    
    lessons: function (subject, standard, grades, format, callback) {
      var uri = encodeURI('api/_design/standards/_view/by-standard-' + subject + '-then-grade-' + format +'?reduce=false&include_docs=true&start_key=[' + standard + ',"' + grades + '"]&end_key=[' + standard + ',"' + grades + '"]');
      $.getJSON(uri, function (response) {
        callback(response.rows);
      });
    }
    
  },
  
  post: {
    
    rating: function (payload, callback) {
      $.ajax({
        type: "POST",
        url: 'api',
        data: JSON.stringify(payload),
        success: function (data) { if (typeof callback === "function") callback(data); },
        dataType: 'json',
        contentType: "application/json",
      })
    }
    
  }

}