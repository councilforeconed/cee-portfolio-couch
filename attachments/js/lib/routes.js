var $content = $('#main-content')
var canvas = Handlebars.compile('<canvas id="{{id}}" width="' + $content.width() + '" height="' + $content.width()/2 +'"></canvas>')

routie('/grades', function() {
  api.get.grades(function (grades) {
    if ( $('#grade-distribution').length === 0 ) {
      $content.children().remove();
      $content.prepend('<h3>Distribution of Content Across the Grades</h3>')
      
      var labels = _.map(grades, function (element) {
        return element.key;
      });

      var values = _.map(grades, function (element) {
        return element.value;
      });

      var data = {
    	  labels : labels,
      	datasets : [ { fillColor : "rgba(202, 219, 42, 0.5)", strokeColor : "rgb(127, 181, 57)", data : values } ]
      }

      var $canvas = $(canvas({id: 'grade-distribution'}));
    
      var ctx = $canvas.get(0).getContext("2d");
      var chart = new Chart(ctx).Radar(data);
      $content.append($canvas);
    }
  });
});

routie('/formats', function() {
  api.get.formats(function (formats) {
    if ( $('#format-distribution').length === 0 ) {
      $content.children().remove();
      
      var data = _.map(formats, function (row) { return { value: row.value } });
      
      data[0] = { color: util.color('light-blue'), value: data[0].value };
      data[1] = { color: util.color('blue'), value: data[1].value };

      var $canvas = $(canvas({id: 'format-distribution'}));
      var ctx = $canvas.get(0).getContext("2d");
      var chart = new Chart(ctx).Pie(data);
      $content.append($canvas);
    }
  });
});

routie('/publications', function() {
  api.get.publications(function (publications) {
    $content.children().remove();
    $publicationsTable = $('<table class="table" id="publications-list">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>Publication</th>' + 
                            '<th>Number of Lessons</th>' + 
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>' + 
                        '</tbody>' + 
                      '</table>');
    $publications = $publicationsTable.find('tbody');
    _.each(publications, function (publication) {
      $('<tr><td>' + publication.key + '</td><td>' + publication.value + '</td></tr>').appendTo($publications);
    });
    $content.append($publicationsTable);
  });
});

routie('/graph/:subject/:format', function(subject, format) {
  api.get.standards(subject, format, function (standards) {
    $content.children().remove();
    
    var color = ['light-blue', 'light-green'][['personal-finance', 'economics'].indexOf(subject)]
    
    var labels = _.map(standards, function (element) { return element.key; });
    var values = _.map(standards, function (element) { return element.value; });
    var data = { labels : labels, datasets : [util.applyColorsToData(color, { data : values })] };
    
    var $canvas = $(canvas({id: 'standards-distribution'}));
    
    var ctx = $canvas.get(0).getContext("2d");
    var distributionChart = new Chart(ctx).Bar(data, {
      scaleOverride : true,
      scaleSteps : 10,
      scaleStepWidth : (function () { return Math.max.apply(this, values) / 10 })(),
      scaleStartValue : 0,
      scaleLabel : "<%=value%>"
    });
    $content.append($canvas);
  });
});

routie('/table/:subject/:format', function (subject, format) {
  api.get.standardsByGrade(subject, format, function (standards) {
    $content.children().remove();
    var $standardsTable = $('<table class="table" id="publications-list">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>Standard</th>' + 
                            '<th>K-2</th>' + 
                            '<th>3-5</th>' + 
                            '<th>6-8</th>' + 
                            '<th>9-12</th>' + 
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>' + 
                        '</tbody>' + 
                      '</table>');
    var $standards = $standardsTable.find('tbody');
    
    var row = Handlebars.compile('<tr>' + 
                                  '<td>' + 
                                    '<a href="#/subject/{{subject}}/standard/{{standard}}" class="standard-header" data-subject="{{subject}}" data-standard="{{standard}}">' +
                                      'Standard {{standard}}' +
                                    '</a>' + 
                                  '</td>' +
                                  '<td>' + 
                                    '{{#if K-2}}<a href="#/subject/{{subject}}/standard/{{standard}}/grades/K-2/format/{{format}}">{{/if}}' +
                                      '{{K-2}}' + 
                                    '{{#if K-2}}</a>{{/if}}' +
                                  '</td>' +
                                  '<td>' + 
                                    '{{#if 3-5}}<a href="#/subject/{{subject}}/standard/{{standard}}/grades/3-5/format/{{format}}">{{/if}}' +
                                      '{{3-5}}' + 
                                    '{{#if 3-5}}</a>{{/if}}' +
                                  '</td>' +
                                  '<td>' + 
                                    '{{#if 6-8}}<a href="#/subject/{{subject}}/standard/{{standard}}/grades/6-8/format/{{format}}">{{/if}}' +
                                      '{{6-8}}' + 
                                    '{{#if 6-8}}</a>{{/if}}' +
                                  '</td>' +
                                  '<td>' + 
                                    '{{#if 9-12}}<a href="#/subject/{{subject}}/standard/{{standard}}/grades/9-12/format/{{format}}">{{/if}}' +
                                      '{{9-12}}' + 
                                    '{{#if 9-12}}</a>{{/if}}' +
                                  '</td>' +
                                '</tr>')
    
    _.chain(standards)
      .map(function (el) {
        return { standard: el.key[0], grades: el.key[1], lessons: el.value };
      })
      .groupBy('standard')
      .each(function (standard) {
        
        var result = {
          standard: 0,
          "K-2": 0,
          "3-5": 0,
          "6-8": 0,
          "9-12": 0,
          subject: subject,
          format: format
        }
        
        result.standard = standard[0].standard;
        
        _.each(standard, function (el) {
          result[el.grades] = el.lessons;
        });
        
        $standardsTable.append(row(result));
        
      });
    
    $content.append($standardsTable);
    
    $('.standard-header').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var standard = $this.data('standard'); 
      var subject = $this.data('subject');
      
      console.log(subject, standard);
    });
  });
});

routie('/subject/:subject/standard/:standard/grades/:grades/format/:format', function (subject, standard, grades, format) {
  api.get.lessons(subject, standard, grades, format, function (lessons) {
    $content.children().remove();
    $.get('templates/lesson.hbs', function (resp) {
      
      var $lessons = $('<div class="lessons"></div>');
      var template = Handlebars.compile(resp);
      
      var compiledLessons = _.each(lessons, function (lesson) {
        $lessons.append(template(lesson.value));
      });
      
      $lessons
        .width($content.width())
        .appendTo($content);
      
        $('.rating').on('click', function (e) {
          e.preventDefault();
          var $this = $(this);
          var lesson = $this.data('lesson'); 
          var rating = $this.data('rating');
          
          console.log(lesson, rating);
        });
    });
  });
});