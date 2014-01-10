Portfolio.LessonController = Ember.ObjectController.extend({
  id: function () {
    var id = this.get('model._id');
    if (id.match(/^\d/)) {
      return parseInt(id, 10);
    } else {
      return id;
    }
  }.property('_id'),
  comments: null,
  comment: null,
  commentEmpty: function () {
    return !this.get('comment');
  },
  updateComments: function () {
    var self = this;
    var view;
    
    if (this.get('econedlink')) {
      view = '/api/_design/app/_view/feedback?key="' + this.get('id') + '"';
    } else {
      view = '/api/_design/app/_view/feedback?key=' + this.get('id');
    }
    
    Em.$.getJSON(view, function (response) {
      var comments = response.rows.map(function (row) {
        return row.value;
      });
      self.set('comments', comments);
    });
  },
  econedlink: function () {
    if (this.get('source') === "EconEdLink") return true;
  }.property('source'),
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
          self.updateComments();
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
          self.updateComments();
        })
        .fail(function (resp) {
          console.log(resp);
          self.set('message', '<strong>Oh no!</strong> Something went terribly wrong.');
        });
    }
  }
})