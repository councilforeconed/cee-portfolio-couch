define(['jquery', 'underscore', './standards', 'bootstrap'], function ($, _, standards) {
  $.fn.createGradeStandardDistributionTable = function (subject, format) {
    var $this = this;
    
    var $table = $(
      '<table class="table">' +
        '<thead>' + 
          '<tr>' +
            '<th>Standard</th>' +
            '<th>3-5</th>' +
            '<th>6-8</th>' +
            '<th>9-12</th>' +
            '<th>K-2</th>' +
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
              '<th class="standard">' + 
                '<a data-toggle="modal" href="#modal" data-subject="' + subject +'" data-standard="' + standard + '">' + 
                  'Standard ' + standard +
                '</a>' + 
              '</th>');
        
          while (el.length < 4) el.push({ lessons: 0 }); 
          _.each(el, function (grade) { $row.append('<td>' + grade.lessons + '</td>'); });
        
          $row.appendTo($table);
        })
        .value();
      
      $this.append($table);
      
      $('th.standard a').on('click', function (e) {
        e.preventDefault();
        var content = standards($(this).data('subject'), $(this).data('standard'))
        $('#modal .modal-title').html('Standard ' + content.standard + ': ' + content.topic);
        $('#modal .standard').html(content.description);
      });
      
    });
  };
});