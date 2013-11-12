var $content = $('#main-content')
var canvas = Handlebars.compile('<canvas id="{{id}}" width="' + $content.width() + '" height="' + $content.width()/2 +'"></canvas>')
var alertTemplate = Handlebars.compile($('#alert-template').html());

var routes = {
  'grades': function() {
    api.get.grades(function (grades) {
      $content.children().remove();
      $content.prepend('<h3>Distribution of Content Across the Grades</h3>');
    
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
    });
  },

  'formats': function() {
    api.get.formats(function (formats) {
      $content.children().remove();
      $content.prepend('<h3>Distribution of Print versus Online Materials</h3>');
    
      var data = _.map(formats, function (row) { return { value: row.value } });
    
      data[0] = { color: util.color('light-blue'), value: data[0].value };
      data[1] = { color: util.color('blue'), value: data[1].value };

      var $canvas = $(canvas({id: 'format-distribution'}));
      var ctx = $canvas.get(0).getContext("2d");
      var chart = new Chart(ctx).Pie(data);
      $content.append($canvas);
    });
  },

  'publications': function() {
    api.get.publications(function (publications) {
      $content.children().remove();
      $content.prepend('<h3>Publications Included in the Portfolio</h3>');
      var template = Handlebars.compile($('#publications-list-template').html());
      $content.append(template({publications: publications}));
    });
  },

  'graph/:subject/:format': function(subject, format) {
    api.get.standards(subject, format, function (standards) {
      $content.children().remove();
      var title = Handlebars.compile('<h3>Distribution of {{format}} Materials Across the {{subject}} Standards</h3>');
      $content.prepend(title({subject: util.parseSubject(subject), format: util.capitalize(format)}));
    
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

  'table/:subject/:format': function (subject, format) {
    api.get.standardsByGrade(subject, format, function (standards) {
      $content.children().remove();
      var title = Handlebars.compile('<h3>{{format}} Materials Across the {{subject}} Standards by Grade</h3>');
      $content.prepend(title({subject: util.parseSubject(subject), format: util.capitalize(format)}));
    
      standards.forEach(function (row) {
        row.subject = subject;
        row.format = format;
      });
          
      var template = Handlebars.compile($('#standards-table-template').html());
      $content.append(template({lessons: standards}));
    
      $('span.standard-header').on('hover', function (e) {
        var $this = $(this);
        var standardNumber = $this.data('standard'); 
        var subject = $this.data('subject');
      
        var standard = util.parseStandard(subject, standardNumber);
    
        $this.popover({
          title: util.parseSubject(subject) + " Standard " + standardNumber,
          content: '<strong>' + standard.topic + '</strong>: ' + standard.description,
          html: true
        });
      });
    });
  },

  'subject/:subject/standard/:standard/grades/:grades/format/:format': function (subject, standard, grades, format) {
    api.get.lessons(subject, standard, grades, format, function (lessons) {
      $content.children().remove();
      var title = Handlebars.compile('<h3>{{format}} Lessons that Address {{subject}} Standard {{standard}} for Grades {{grades}}</h3>');
      $content.prepend(title({
        subject: util.parseSubject(subject),
        format: util.capitalize(format),
        grades: grades,
        standard: standard
      }));

      var lessonTemplate = Handlebars.compile($('#lesson-template').html());
      var alertTemplate = Handlebars.compile($('#alert-template').html());

      var $lessons = $('<div class="lessons"></div>');

      _.each(lessons, function (lesson) {
        $lessons.append(lessonTemplate(lesson.value));
      });

      $lessons.appendTo($content);
      
      $('.rating.like, .rating.dislike, .rating.miscategorized').on('click', function (e) {
        var $this = $(this);
        auth.ifLoggedIn(function (username) {
          
          var lesson = $this.data('lesson');
          var rating = $this.data('rating');
          var type = $this.attr('class').match(/btn-(\w+)/)[1]
          
          var payload = util.applyHashData({
            lesson: lesson,
            type: 'rating',
            rating: rating,
            user: username,
          });
          
          var alertContent = (function (type) {
            if (type === "like") return 'You like this lesson.';
            if (type === "dislike") return 'You dislike this lesson.';
            if (type === "miscategorized") return 'You believe this lesson has been miscategorized. Please leave a comment with more details.';
          })(rating);
          
          api.post.rating(payload, function () {
            $this.parents('.lesson').find('.lesson-notifications').append(alertTemplate({
              content: alertContent,
              type: 'alert-' + type 
            }));
            $this.attr('disabled', true); 
          });

        });
      });
      
      $('.rating.comment').on('click', function (e) {
        $(this).parents('.panel').find('.comment-submission').toggleClass('hidden');
      });
      
      $('.comment-submission button').on('click', function (e) {
        var $this = $(this);
        auth.ifLoggedIn(function (username) {
          var lesson = $this.parents('.lesson').data('lesson');
          var comment = $this.parents('.comment-submission').find('textarea').val();
          
          var payload = util.applyHashData({
            lesson: lesson,
            type: 'rating',
            comment: comment,
            rating: 'comment',
            user: username
          });
          
          api.post.rating(payload, function () {
            $this.parents('.lesson').find('.lesson-notifications').append(alertTemplate({
              title: 'You left the following comment on this lesson:',
              content: payload.comment,
              type: 'alert-info'
            }));
            
            $this.parents('.comment-submission')
              .toggleClass('hidden')
              .parents('.lesson')
                .find('button.rating.comment')
                  .attr('disabled', true);
          });
        });
      });
      
    });
  }
}

var Router = Backbone.Router.extend({
    routes: routes
});

router = new Router();
Backbone.history.start();