Portfolio.LessonsIndexController = Ember.ArrayController.extend({
  
  totalLessons: function () {
    return this.get('filteredLessons').length;
  }.property('filteredLessons'),
  
  lessonsAtATime: 20,
  
  startingPosition: 0,
  
  endingPosition: function () {
    var ending = this.get('startingPosition') + this.get('lessonsAtATime');
    if (ending < this.get('totalLessons')) {
      return ending ;
    } else {
      return this.get('totalLessons') - 1;
    }
  }.property('startingPosition', 'lessonsAtATime', 'totalLessons'),
  
  pagesOfLessons: function () {
    return Math.ceil(this.get('totalLessons') / this.get('lessonsAtATime')) - 1;
  }.property('lessonsAtATime', 'totalLessons'),
  
  currentPage: function () {
    return Math.floor(this.get('startingPosition') / this.get('totalLessons') * this.get('pagesOfLessons')) + 1;
  }.property('startingPosition', 'pagesOfLessons', 'totalLessons'),
  
  viewableRange: function () {
    var starting = parseInt(this.get('startingPosition'), 10) + 1;
    var ending = parseInt(this.get('endingPosition'), 10) + 1;
    return starting + ' through ' + ending;
  }.property('startingPosition', 'endingPosition'),
  
  viewableLessons: function () {
    var lessons = this.get('filteredLessons');
    return lessons.slice(this.get('startingPosition'), this.get('endingPosition'));
  }.property('startingPosition', 'endingPosition', 'filteredLessons'),
  
  grades: ['K-2', '3-5', '6-8', '9-12'],
  
  // Default Filter Properties
  includeOnline: true,
  includePrint: true,
  gradeSelected: null,
  economicsStandardSelected: null,
  personalFinanceStandardSelected: null,
  
  filteredLessons: function () {
    var lessons = this.get('model');
    
    if (!this.get('includeOnline')) {
      lessons = lessons.reject(function (lesson) {
        return lesson.get('isOnline');
      });
    }
    
    if (!this.get('includePrint')) {
      lessons = lessons.reject(function (lesson) {
        return lesson.get('isPrint');
      });
    }
    
    if (this.get('titleSearch')) {
      var query = this.get('titleSearch').toLowerCase();
      lessons = lessons.filter(function (lesson) {
        return lesson.get('title').toLowerCase().indexOf(query) > -1;
      });
    }
    
    if (this.get('publicationSearch')) {
      var query = this.get('publicationSearch').toLowerCase();
      lessons = lessons.filter(function (lesson) {
        return lesson.get('publication.title').toLowerCase().indexOf(query) > -1;
      })
    }
    
    if (this.get('gradeSelected')) {
      var grade = this.get('gradeSelected');
      lessons = lessons.filter(function (lesson) {
        if (!lesson.get('grades')) return false;
        return lesson.get('grades').indexOf(grade) >= 0; 
      })
    }
    
    if (this.get('economicsStandardSelected')) {
      var standard = this.get('economicsStandardSelected');
      lessons = lessons.filter(function (lesson) {
        return lesson.get('standards.economics').indexOf(standard) >= 0; 
      })
    }
    
    if (this.get('personalFinanceStandardSelected')) {
      var standard = this.get('personalFinanceStandardSelected');
      lessons = lessons.filter(function (lesson) {
        return lesson.get('standards.personalFinance').indexOf(standard) >= 0; 
      })
    }
    
    return lessons;
  }.property('includeOnline', 'includePrint', 'titleSearch', 'publicationSearch', 'gradeSelected', 'economicsStandardSelected', 'personalFinanceStandardSelected'),
  
  actions: {
    nextPage: function(){
      var lastPossibleStartingPosition = this.get('totalLessons') - this.get('lessonsAtATime');
      var newStartingPosition = this.get('startingPosition') + this.get('lessonsAtATime');
      if (newStartingPosition > lastPossibleStartingPosition) {
        newStartingPosition = lastPossibleStartingPosition
        Em.$('.pages .next').addClass('disabled');
      };
      Em.$('.pages .previous').removeClass('disabled');
      this.set('startingPosition', newStartingPosition);
    },
    previousPage: function(){
      var newStartingPosition = this.get('startingPosition') - this.get('lessonsAtATime');
      if (newStartingPosition <= 0) {
        newStartingPosition = 0
        Em.$('.pages .previous').addClass('disabled');
      };
      Em.$('.pages .next').removeClass('disabled');
      this.set('startingPosition', newStartingPosition);
    },
    changeLessonsAtATime: function (amount) {
      this.set('lessonsAtATime', amount);
    },
    lookupPublication: function (title) {
      this.set('publicationSearch', title);
    }
  }
  
});