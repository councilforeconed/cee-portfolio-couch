define(['jquery', 'underscore', 'chart'], function ($, _, Chart) {
  $.fn.createFormatDistributionChart = function () {
    var $this = this;
    
    $.getJSON('api/_design/publications/_view/count-format?group_level=1', function (response) {
  
      var data = _.map(response.rows, function (row) { return { value: row.value } });
  
      var ctx = $this.get(0).getContext("2d");
      var gradeDistributionChart = new Chart(ctx).Pie(data);
    });
  };
});