Portfolio.Router.map(function () {
  
  this.resource('lessons', function () {
    this.route('subject', { path: '/subject/:subject' });
    this.route('subjectStandard', { path: '/subject/:subject/standard/:standard' });
    this.route('subjectStandardGrade', { path: '/subject/:subject/standard/:standard/grade/:grade' });
    this.route('subjectStandardFormat', { path: '/subject/:subject/standard/:standard/format/:format' });
    this.route('subjectStandardGradeFormat', { path: '/subject/:subject/standard/:standard/grade/:grade/format/:format' });
    this.route('subjectStandardGradeFormatType', { path: '/subject/:subject/standard/:standard/grade/:grade/format/:format/type/:type' });
  });
  
  this.route('lesson', { path: '/lesson/:lesson_id' });

});