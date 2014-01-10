Portfolio.Comment = Ember.Object.extend({
  toJSON: function () {
    var comment = {
      lesson: this.get('lesson'),
      type: this.get('type'),
      username: this.get('username'),
      comment: this.get('comment')
    };
    return JSON.stringify(comment);
  }.property('lesson', 'type', 'username', 'comment'),
  save: function () {
    console.log(this.get('toJSON'));
    return $.ajax({
      type: "POST",
      url: '/api',
      data: this.get('toJSON'),
      dataType: 'json',
      contentType: "application/json"
    });
  }
});