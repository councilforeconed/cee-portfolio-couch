Portfolio.LessonOverviewComponent = Ember.Component.extend({
  
  count: function () {
    var lessons = this.get('lessons');
    return lessons ? lessons.length : 0;
  }.property('lessons'),
  
  concepts: function () {
    return this.get('lessons').mapBy('concepts').flatten().uniq().join(', ');
  }.property('lessons'),
  
  economicsStandards: function () {
    return this.get('lessons').mapBy('standards.economics')
      .flatten()
      .uniq()
      .sort(function (a, b) {
        return a - b;
      })
      .join(', ');
  }.property('lessons'),
  
  personalFinanceStandards: function () {
    return this.get('lessons').mapBy('standards.personalFinance')
      .flatten()
      .uniq()
      .sort(function (a, b) {
        return a - b;
      })
      .join(', ');
  }.property('lessons'),
  
  commonCoreStandards: function () {
    return this.get('lessons').mapBy('standards.commonCore')
      .flatten()
      .uniq()
      .sort(function (a, b) {
        return a - b;
      })
      .join(', ');
  }.property('lessons'),
  
});