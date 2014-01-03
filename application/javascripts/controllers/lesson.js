Portfolio.LessonController = Ember.ObjectController.extend({
  comment: null,
  commentEmpty: function () {
    return !this.get('comment');
  },
  message: null,
  actions: {
    commentSubmission: function (data) {
      this.set('comment', null);
      this.set('message', '<strong>Great!</strong> Your comment has been recorded!');
    },
    rate: function (rating, lesson) {
      if (rating === 'like' || rating === 'dislike') {
        this.set('message', '<strong>Alright.</strong> A note has been left that you ' + rating + ' this lesson.');
      }
      
      if (rating === 'miscategorized') {
        this.set('message', '<strong>Alright.</strong> A note has been left that you believe this lesson is miscategorized. Please leave a comment with more information.');
        this.set('comment', 'I believe this lesson has been miscategorized because...');
      }
      
      Em.$('.rating-' + rating).addClass('disabled');
    }
  }
})