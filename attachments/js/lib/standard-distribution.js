define(['jquery', 'underscore', 'chart', './_util'], function ($, _, Chart, util) {
  $.fn.createStandardDistributionChart = function (subject, format) {
    var $this = $(this);
    var context = format ? subject + '-' + format : subject;
    
    var color = util.subjectColor(subject);
    
    $.getJSON('api/_design/standards/_view/count-' + context + '?group_level=1', function (response) {
      var labels = _.map(response.rows, function (element) { return element.key; });
      var values = _.map(response.rows, function (element) { return element.value; });
      var data = { labels : labels, datasets : [util.applyColorsToData(color, { data : values })] };
  
      var ctx = $this.get(0).getContext("2d");
      var distributionChart = new Chart(ctx).Bar(data, {
        scaleOverride : true,
        scaleSteps : 10,
        scaleStepWidth : (function () { return Math.max.apply(this, values) / 10 })(),
        scaleStartValue : 0,
        scaleLabel : "<%=value%>"
      });
    });
  };
});