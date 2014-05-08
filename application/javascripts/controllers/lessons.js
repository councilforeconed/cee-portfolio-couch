Portfolio.LessonsIndexController = Ember.ArrayController.extend({
  
  startingPosition: 0,
  lessonsAtATime: 20,
  
  includeOnline: true,
  includePrint: true,
  includeLessons: true,
  includeInteractives: true,
  gradeSelected: null,
  economicsStandardSelected: null,
  personalFinanceStandardSelected: null,
  publicationSearch: null,
  titleSearch: null,
  relatedSubjectSelected: null,
  sortProperty: 'rating',
  
  grades: ['K-2', '3-5', '6-8', '9-12'],
  
  viewableLessons: function () {
    var start = this.get('startingPosition');
    var end = start + this.get('lessonsAtATime');
    return this.get('filteredLessons')
               .sortBy(this.get('sortProperty'))
               .reverse()
               .slice(start, end);
  }.property('filteredLessons', 'startingPosition', 'lessonsAtATime', 'sortProperty'),
  
  numberOfLessons: function () {
    return this.get('content').length;
  }.property('content.@each'),
  
  selectedLessons: function () {
    console.log(this.get('content').filterBy('isSelected', true));
    return this.get('content').filterBy('isSelected', true);
  }.property('content.@each.isSelected'),
  
  filteredLessons: function () {
    var self = this;
    return this.get('content').filter(function (lesson) {
      
      if (!self.get('includePrint') && lesson.get('isPrint')) return false;
      if (!self.get('includeOnline') && lesson.get('isOnline')) return false;
      if (!self.get('includeLessons') && lesson.get('isLesson')) return false;
      if (!self.get('includeInteractives') && lesson.get('isInteractive')) return false;
      
      if (self.get('titleSearch')) {
        var query = self.get('titleSearch').toLowerCase();
        if (lesson.get('title').toLowerCase().indexOf(query) === -1) return false;
      }
      
      if (self.get('publicationSearch')) {
        var query = self.get('publicationSearch').toLowerCase();
        if (lesson.get('publication.title').toLowerCase().indexOf(query) === -1) return false;
      }
      
      if (self.get('gradeSelected')) {
        var grade = self.get('gradeSelected');
        if (!lesson.get('grades') || lesson.get('grades').indexOf(grade) === -1) return false;
      }
      
      if (self.get('economicsStandardSelected')) {
        var standard = self.get('economicsStandardSelected');
        if (lesson.get('standards.economics').indexOf(standard) === -1) return false;
      }
    
      if (self.get('personalFinanceStandardSelected')) {
        var standard = self.get('personalFinanceStandardSelected');
        if (lesson.get('standards.personalFinance').indexOf(standard) === -1) return false;
      }
    
      if (self.get('relatedSubjectSelected')) {
        var subject = self.get('relatedSubjectSelected');
        var subjects = lesson.get('subjects');
        if (!subjects) return false;
        if (subjects.indexOf(subject) === -1) return false;
      }
      
      return true;
      
    });
  }.property('content', 'includeOnline', 'includePrint', 'includeLessons', 'includeInteractives', 'titleSearch', 'publicationSearch', 'gradeSelected', 'economicsStandardSelected', 'personalFinanceStandardSelected', 'relatedSubjectSelected'),
  
  // OBSERVERS: These will toggle based on user selections
  
  turnOffPrintIfUserTurnsOffLessons: function () {
    if (!this.get('includeLessons')) {
      this.set('includePrint', false);
    }
  }.observes('includeLessons'),
  
  turnOffPrintIfUserTurnsOffLessons: function () {
    if (!this.get('includeOnline')) {
      this.set('includeInteractives', false);
    }
  }.observes('includeOnline'),
  
  // ACTIONS
  
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
    },
    
    clearFilters: function () {
      this.set('includeOnline', true);
      this.set('includePrint', true);
      this.set('includeLessons', true);
      this.set('includeInteractives', true);
      this.set('gradeSelected', null);
      this.set('economicsStandardSelected', null);
      this.set('personalFinanceStandardSelected', null);
      this.set('publicationSearch', null);
      this.set('titleSearch', null);
      this.set('relatedSubjectSelected', null);
    },
    
    sortByRating: function () {
      this.set('sortProperty', 'rating');
    },
    sortByTeacherPageviews: function () {
      this.set('sortProperty', 'teacherPageviews');
    },
    sortByStudentPageviews: function () {
      this.set('sortProperty', 'studentPageviews');
    },
    
  }
  
});