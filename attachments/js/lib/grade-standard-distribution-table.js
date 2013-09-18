define(['jquery', 'underscore'], function ($, _) {
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
      
    var standardHeader = _.template('<th class="standard">Standard <%- standard %></th>')
      
    $.getJSON('api/_design/standards/_view/by-standard-' + subject + '-then-grade-' + format + '?group_level=2', function (response) {
      var data = _.chain(response.rows)
        .map(function (el) {
          return { standard: el.key[0], grades: el.key[1], lessons: el.value };
        })
        .groupBy('standard')
        .each(function (el) {
          $row = $('<tr></tr>')
            .append(standardHeader(el[0]));
        
          while (el.length < 4) el.push({ lessons: 0 }); 
          _.each(el, function (grade) { $row.append('<td>' + grade.lessons + '</td>'); });
        
          $row.appendTo($table);
        })
        .value();
      $this.append($table);
    });
  }
});