$.getJSON('api/_design/grades/_view/count?group_level=1', function (response) {
  
  var labels = _.map(response.rows, function (element) {
    return element.key;
  });
  
  var values = _.map(response.rows, function (element) {
    return element.value;
  });
  
  var data = {
	  labels : labels,
  	datasets : [
  		{
  			fillColor : "rgba(26, 117, 183, 0.5)",
  			strokeColor : "rgb(16, 107, 173)",
  			data : values
  		}
  	]
  }
  
  var ctx = $("#grade-distribution").get(0).getContext("2d");
  var gradeDistributionChart = new Chart(ctx).Radar(data);
});

$.getJSON('api/_design/standards/_view/count-personal-finance-print?group_level=1', function (response) {
  
  var labels = _.map(response.rows, function (element) {
    return element.key;
  });
  
  var values = _.map(response.rows, function (element) {
    return element.value;
  });
  
  var data = {
	  labels : labels,
  	datasets : [
  		{
  			fillColor : "rgba(26, 117, 183, 0.5)",
  			strokeColor : "rgb(16, 107, 173)",
  			data : values
  		}
  	]
  }
  
  var ctx = $("#personal-finance-standard-distribution").get(0).getContext("2d");
  var gradeDistributionChart = new Chart(ctx).Radar(data, { scaleShowLabels: true });
});

$.getJSON('api/_design/standards/_view/count-economics-print?group_level=1', function (response) {
  
  var labels = _.map(response.rows, function (element) {
    return element.key;
  });
  
  var values = _.map(response.rows, function (element) {
    return element.value;
  });
  
  var data = {
	  labels : labels,
  	datasets : [
  		{
  			fillColor : "rgba(26, 117, 183, 0.5)",
  			strokeColor : "rgb(16, 107, 173)",
  			data : values
  		}
  	]
  }
  
  var ctx = $("#economics-standard-distribution").get(0).getContext("2d");
  var gradeDistributionChart = new Chart(ctx).Bar(data, {
    scaleOverride : true,
    scaleSteps : 5,
    scaleStepWidth : 50,
    scaleStartValue : 0,
    scaleLabel : "<%=value%>",
  });
});