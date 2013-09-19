define(['jquery', 'underscore', './_util', 'bootstrap'], function ($, _, util) {
  $.fn.createGradeStandardDistributionTable = function (subject, format) {
    var $this = this;
    
    var $table = $(
      '<table class="table">' +
        '<thead>' + 
          '<tr>' +
            '<th>Standard</th>' +
            '<th>K-2</th>' +
            '<th>3-5</th>' +
            '<th>6-8</th>' +
            '<th>9-12</th>' +
          '</tr>' +
        '</thead>' +
      '</table>');
      
    $.getJSON('api/_design/standards/_view/by-standard-' + subject + '-then-grade-' + format + '?group_level=2', function (response) {
      var data = _.chain(response.rows)
        .map(function (el) {
          return { standard: el.key[0], grades: el.key[1], lessons: el.value };
        })
        .groupBy('standard')
        .each(function (el) {
          var standard = el[0].standard
          $row = $('<tr></tr>')
            .append(
              '<td class="standard">' + 
                '<a data-toggle="modal" data-target="#modal" href="#" data-subject="' + subject +'" data-standard="' + standard + '">' + 
                  'Standard ' + standard +
                '</a>' + 
              '</td>');
        
          while (el.length < 4) el.push({ lessons: 0 }); 
          _.each([3,1,2,0], function (grade) {
            if (el[grade].lessons === 0) {
              $row.append('<td>0</td>'); 
            } else {
              $row.append(
                '<td>' + 
                  '<a ' +
                    'href="' + encodeURI('api/_design/standards/_list/standards-by-grade/by-standard-' + subject + '-then-grade-' + format +'?reduce=false&include_docs=true&start_key=[' + el[grade].standard + ',"' + el[grade].grades + '"]&end_key=[' + el[grade].standard + ',"' + el[grade].grades + '"]') + '"' +
                    'class="grade-standard-count" ' + 
                    'data-target="#modal" data-toggle="modal"' +
                    'data-grade="' + el[grade].grades + '" data-standard="' + el[grade].standard + '" data-format="' + format + '" data-subject="' + subject + '"' +
                   '>' + 
                    el[grade].lessons + 
                  '</a>' + 
                '</td>'
                ); 
            }
            
          });
        
          $row.appendTo($table);
        })
        .value();
      
      $this.append($table);
      
      var $modal = $('#modal');
      var $modalBody = $('#modal .modal-body');
      var $modalTitle = $('#modal .modal-title')
      
      $this.find('td.standard a').on('click', function (e) {
        e.preventDefault();
        var content = util.parseStandard($(this).data('subject'), $(this).data('standard'));
        var clickedSubject = util.parseSubject($(this).data('subject'));
        
        $modal.on('show.bs.modal', function () {
          $modalTitle.html(clickedSubject + ', Standard ' + content.standard + ': ' + content.topic);
          $modalBody.html('<p>' + content.description + '</p>');
        }).modal();
      });
      
      $this.find('a.grade-standard-count').on('click', function (e) {
        e.preventDefault();
        
        var clickedStandard = $(this).data('standard');
        var clickedGrade = $(this).data('grade');
        var clickedFormat = $(this).data('format');
        var clickedSubject = util.parseSubject($(this).data('subject'));
        
        $modal.on('show.bs.modal', function () {
          $modalTitle.html(clickedSubject + ': Grades ' + clickedGrade + ', Standard ' + clickedStandard + ' <span class="label label-info">' + clickedFormat + '</span>');
          $modalBody.empty();
          $('<div></div>').load(e.currentTarget.href).appendTo($modalBody);
        }).modal();
      })
      
    });
  };
});