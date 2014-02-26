Portfolio.FeedbackController = Ember.ArrayController.extend({
  lessons: function () {
    return this.get('content').filter(function (comment) {
      return comment.comment === 'like';
    }).map(function (comment) {
      return comment.lesson;
    }).uniq();
  }.property('content'),
  elementarySchool: function () {
    return this.get('lessons').filter(function (lesson) {
      return lesson.get('isElementarySchool');
    })
  }.property('lessons'),
  middleSchool: function () {
    return this.get('lessons').filter(function (lesson) {
      return lesson.get('ismiddleSchool');
    })
  }.property('lessons'),
  highSchool: function () {
    return this.get('lessons').filter(function (lesson) {
      return lesson.get('isHighSchool');
    })
  }.property('lessons'),
  elementarySchoolCount: function () {
    return this.get('elementarySchool').length;
  }.property('elementarySchool'),
  middleSchoolCount: function () {
    return this.get('middleSchool').length;
  }.property('middleSchool'),
  highSchoolCount: function () {
    return this.get('highSchool').length;
  }.property('highSchool'),
  economicsStandardsCounts: function() {
    var standards =  _(this.get('lessons')).map(function(lesson) {
      return lesson.get('standards.economics')
    }).flatten().reduce(function (counts, current, index, array) {
      if (counts[current]) {
        counts[current]++;
      } else {
        counts[current] = 1;
      }
      return counts;
    }, {});
    return _(standards).pairs().map(function(array) {
      return { standard: array[0], count: array[1] };
    }).value();
  }.property('lessons'),
  personalFinanceStandardsCounts: function() {
    var standards = _(this.get('lessons')).map(function(lesson) {
      return lesson.get('standards.personalFinance')
    }).flatten().reduce(function (counts, current, index, array) {
      if (counts[current]) {
        counts[current]++;
      } else {
        counts[current] = 1;
      }
      return counts;
    }, {});
    return _(standards).pairs().map(function(array) {
      return { standard: array[0], count: array[1] };
    }).value();
  }.property('lessons')
});