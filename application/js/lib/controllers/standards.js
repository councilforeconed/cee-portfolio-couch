App.StandardsEconomicsController = Ember.ArrayController.extend({
  standard: function () {
    return this.get('model')[0].standard
  }.property('model'),
  title: function () {
    return "Lessons Addressing Economics Standard " + this.get('standard');
  }.property('standard')
});