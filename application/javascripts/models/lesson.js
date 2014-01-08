Portfolio.Lesson = Ember.Object.extend({
  isPrint: function () {
    return this.get('format') === 'print';
  }.property('format'),
  isOnline: function () {
    return this.get('format') === 'online';
  }.property('format'),
  isLesson: function () {
    return this.get('type') !== "interactive";
  }.property('type'),
  isInteractive: function () {
    return this.get('type') === "interactive";
  }.property('type'),
  isEconomics: function () {
    return this.get('standards.economics').length;
  }.property('economicsStandards'),
  isPersonalFinance: function () {
    return this.get('standards.personalFinance').length;
  }.property('personalFinanceStandards'),
  hasGrades: function () {
    return !!this.get('grades');
  }.property('grades'),
  isEarlyChildhood: function () {
    if (this.get('grades')) return this.get('grades').indexOf('K-2') !== -1;
  }.property('grades'),
  isElementarySchool: function () {
    if (this.get('grades')) return this.get('grades').indexOf('3-5') !== -1;
  }.property('grades'),
  isMiddleSchool: function () {
    if (this.get('grades')) return this.get('grades').indexOf('6-8') !== -1;
  }.property('grades'),
  isHighSchool: function () {
    if (this.get('grades')) return this.get('grades').indexOf('9-12') !== -1;
  }.property('grades')
});