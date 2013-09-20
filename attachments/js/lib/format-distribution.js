define(['jquery', 'underscore', 'chart', './_util'], function ($, _, Chart, util) {
  $.fn.createFormatDistributionChart = function () {
    var $this = this;
    
    $.getJSON('api/_design/publications/_view/count-format?group_level=1', function (response) {
      
      var data = _.map(response.rows, function (row) { return { value: row.value } });
      
      data[0] = { color: util.color('light-blue'), value: data[0].value };
      data[1] = { color: util.color('blue'), value: data[1].value };
  
      var ctx = $this.get(0).getContext("2d");
      var gradeDistributionChart = new Chart(ctx).Pie(data);
    });
  };
});