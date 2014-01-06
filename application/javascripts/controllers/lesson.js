Portfolio.LessonController = Ember.ObjectController.extend({
  id: function () {
    return parseInt(this.get('model._id'), 10);
  }.property('_id'),
  comment: null,
  commentEmpty: function () {
    return !this.get('comment');
  },
  message: null,
  storeUsername: function () {
    localStorage.setItem('username', Portfolio.Username);
  }.observes('Portfolio.Username'),
  actions: {
    commentSubmission: function () {
      var self = this;
      
      var comment = Portfolio.Comment.create({
        lesson: this.get('id'),
        username: Portfolio.Username,
        type: 'comment',
        comment: self.get('comment'),
      });
      
      comment
        .save()
        .done(function () {
          self.set('comment', null);
          self.set('message', '<strong>Great!</strong> Your comment has been recorded!');
        })
        .fail(function () {
          self.set('message', '<strong>Oh no!</strong> Something went terribly wrong.');
        });
      
    },
    rate: function (rating, lesson) {
      var self = this;
      
      var comment = Portfolio.Comment.create({
        username: Portfolio.Username,
        type: 'rating',
        comment: rating,
        lesson: this.get('id'),
      });
      
      comment
        .save()
        .done(function () {
          if (rating === 'like' || rating === 'dislike') {
            self.set('message', '<strong>Alright.</strong> A note has been left that you ' + rating + ' this lesson.');
          }
        
          if (rating === 'miscategorized') {
            self.set('message', '<strong>Alright.</strong> A note has been left that you believe this lesson is miscategorized. Please leave a comment with more information.');
            self.set('comment', 'I believe this lesson has been miscategorized because...');
          }
      
          Em.$('.rating-' + rating).addClass('disabled');
        })
        .fail(function () {
          self.set('message', '<strong>Oh no!</strong> Something went terribly wrong.');
        });
    }
  }
})