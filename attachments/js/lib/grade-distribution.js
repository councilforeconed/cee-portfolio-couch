define(['jquery', 'underscore', 'chart'], function ($, _, Chart) {
  $.fn.createGradeDistributionChart = function () {
    var $this = this;
    
    $.getJSON('api/_design/grades/_view/count?group_level=1', function (response) {
  
      var labels = _.map(response.rows, function (element) {
        return element.key;
      });
  
      var values = _.map(response.rows, function (element) {
        return element.value;
      });
  
      var data = {
    	  labels : labels,
      	datasets : [ { fillColor : "rgba(202, 219, 42, 0.5)", strokeColor : "rgb(127, 181, 57)", data : values } ]
      }
  
      var ctx = $this.get(0).getContext("2d");
      var gradeDistributionChart = new Chart(ctx).Radar(data);
    });
  };
});