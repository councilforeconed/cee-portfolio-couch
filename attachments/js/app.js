require.config({
  paths: {
    'jquery': 'vendor/jquery-1.10.2.min',
    'underscore': 'vendor/underscore-min',
    'bootstrap': 'vendor/bootstrap.min',
    'chart': 'vendor/chart'
  },
  shim: {
    underscore: { exports: '_' },
    chart: { exports: 'Chart' }
  }
});

require(['jquery', 'lib/grade-distribution'], function ($) {
  $("#grade-distribution").createGradeDistributionChart();
});

require(['jquery', 'lib/format-distribution'], function ($) {
  $("#format-distribution").createFormatDistributionChart();
});

require(['jquery', 'lib/standard-distribution'], function ($) {
  $("#economics-standard-distribution-print")
    .createStandardDistributionChart('economics', 'print');
  $("#personal-finance-standard-distribution-print")
    .createStandardDistributionChart('personal-finance', 'print');
  $("#economics-standard-distribution-online")
    .createStandardDistributionChart('economics', 'online');
  $("#personal-finance-standard-distribution-online")
    .createStandardDistributionChart('personal-finance', 'online');
  $("#economics-standard-distribution-interactive")
    .createStandardDistributionChart('economics', 'interactive');
  $("#personal-finance-standard-distribution-interactive")
    .createStandardDistributionChart('personal-finance', 'interactive');
  $("#economics-standard-distribution-combined")
    .createStandardDistributionChart('economics');
  $("#personal-finance-standard-distribution-combined")
    .createStandardDistributionChart('personal-finance');
});

require(['jquery', 'lib/grade-standard-distribution-table'], function ($) {
  $('#table-personal-finance-online').createGradeStandardDistributionTable('personal-finance', 'online')
  $('#table-personal-finance-print').createGradeStandardDistributionTable('personal-finance', 'print')
  $('#table-economics-online').createGradeStandardDistributionTable('economics', 'online')
  $('#table-economics-print').createGradeStandardDistributionTable('economics', 'print')
  $('#table-personal-finance-interactive').createGradeStandardDistributionTable('personal-finance', 'interactive')
  $('#table-economics-interactive').createGradeStandardDistributionTable('economics', 'interactive')
});