Portfolio.Comment = Ember.Object.extend({
  save: function (success, failure) {
    console.log(this);
    success();
  }
});