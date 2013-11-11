var $content = $('#main-content')
var canvas = Handlebars.compile('<canvas id="{{id}}" width="' + $content.width() + '" height="' + $content.width()/2 +'"></canvas>')

var routes = {
  '/grades': function() {
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
  },

  '/formats': function() {
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
  },

  '/publications': function() {
    api.get.publications(function (publications) {
      $content.children().remove();
      var template = Handlebars.compile($('#publications-list-template').html());
      $content.append(template({publications: publications}));
    });
  },

  '/graph/:subject/:format': function(subject, format) {
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
  },

  '/table/:subject/:format': function (subject, format) {
    api.get.standardsByGrade(subject, format, function (standards) {
      $content.children().remove();
    
      standards.forEach(function (row) {
        row.subject = subject;
        row.format = format;
      });
          
      var template = Handlebars.compile($('#standards-table-template').html());
      $content.append(template({lessons: standards}));
    
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
  },

  '/subject/:subject/standard/:standard/grades/:grades/format/:format': function (subject, standard, grades, format) {
    api.get.lessons(subject, standard, grades, format, function (lessons) {
      $content.children().remove();
      
      var $lessons = $('<div class="lessons"></div>');
      var template = Handlebars.compile($('#lesson-template').html());
    
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
  }
}

var router = Router(routes);
router.init(window.location.hash);