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
    $.get('templates/publications.hbs', function (template) {
      var template = Handlebars.compile(template);
      $content.append(template({publications: publications}));
    })
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
    
    $.get('templates/standards-table.hbs', function (template) {
      
      var template = Handlebars.compile(template);
      var lessons = _.chain(standards)
        .map(function (el) {
          return { standard: el.key[0], grades: el.key[1], lessons: el.value };
        })
        .groupBy('standard')
        .map(function (standard) {
          var result = {
            standard: standard[0].standard,
            "K-2": 0,
            "3-5": 0,
            "6-8": 0,
            "9-12": 0,
            subject: subject,
            format: format
          }
        
          _.each(standard, function (el) {
            result[el.grades] = el.lessons;
          });
        
          return result;
        }).value();
      
      $content.append(template({lessons: lessons}));
      
      $('.standard-header').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var standardNumber = $this.data('standard'); 
        var subject = $this.data('subject');
        
        var standard = util.parseStandard(subject, standardNumber);
      
        $this.popover({
          title: util.parseSubject(subject) + " Standard " + standardNumber,
          content: '<strong>' + standard.topic + '</strong>: ' + standard.description,
          html: true
        })
      });
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