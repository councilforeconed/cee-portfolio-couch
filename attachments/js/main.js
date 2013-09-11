var getColor = (function () {
  var colors = ["rgba(26, 117, 183, 0.5)", "rgba(128, 181, 57, 0.5)", "rgba(42, 94, 125, 0.5)", "rgba(124, 124, 124, 0.5)"];
  var index = 0;
  return function () {
    return colors[index++ % colors.length];
  }
})()

var subjects = ['economics', 'personal-finance'];

$.getJSON('api/_design/grades/_view/count?group_level=1', function (response) {
  
  var labels = _.map(response.rows, function (element) {
    return element.key;
  });
  
  var values = _.map(response.rows, function (element) {
    return element.value;
  });
  
  var data = {
	  labels : labels,
  	datasets : [ { fillColor : "rgba(26, 117, 183, 0.5)", strokeColor : "rgb(16, 107, 173)", data : values } ]
  }
  
  var ctx = $("#grade-distribution").get(0).getContext("2d");
  var gradeDistributionChart = new Chart(ctx).Radar(data);
});

$.getJSON('api/_design/publications/_view/count-format?group_level=1', function (response) {
  
  var data = _.map(response.rows, function (row) { return { value: row.value } });
  
  data.forEach(function (datum, index) {
    datum.color = getColor();
  });
  
  var ctx = $("#format-distribution").get(0).getContext("2d");
  var gradeDistributionChart = new Chart(ctx).Pie(data);
});

$('.standards-distribution').each(function (index, canvas) {
  var subject, format, properties;
  
  var $this = $(this);
  
  properties = canvas.id.match(/(economics|personal-finance)-standard-distribution-(print|online|combined)/)
  subject = properties[1];
  
  if (properties[2] === "combined") {
    format = "";
  } else {
    format = "-" + properties[2];
  } 
  
  $.getJSON('api/_design/standards/_view/count-' + subject + format + '?group_level=1', function (response) {
    var labels = _.map(response.rows, function (element) { return element.key; });
    var values = _.map(response.rows, function (element) { return element.value; });
    var data = { labels : labels, datasets : [{ fillColor : getColor(), data : values }] };
    
    var ctx = $this.get(0).getContext("2d");
    var distributionChart = new Chart(ctx).Bar(data, {
      scaleOverride : true,
      scaleSteps : 10,
      scaleStepWidth : (function () { return Math.max.apply(this, values) / 10 })(),
      scaleStartValue : 0,
      scaleLabel : "<%=value%>",
    });
  });
})

$('.distribution-table').each(function (index, table) {
  var $this = $(this);
  
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
  
  var properties = table.id.match(/table-(.*)-(online|print)/)
  var subject = properties[1];
  var format = properties[2];
  
  $.getJSON('api/_design/standards/_view/by-standard-' + subject + '-then-grade-' + format + '?group_level=2', function (response) {
    var data = _.chain(response.rows)
      .map(function (el) {
        return { standard: el.key[0], grades: el.key[1], lessons: el.value };
      })
      .groupBy('standard')
      .each(function (el) {
        $row = $('<tr></tr>').append('<td> Standard ' + el[0].standard + '</td>')
        
        while (el.length < 4) { el.push({ lessons: 0 }); }
        
        _.each(el, function (grade) {
          $row.append('<td>' + grade.lessons + '</td>');
        }); 
        
        $row.appendTo($table);
      })
      .value();
    
    $this.append($table);
  });
});