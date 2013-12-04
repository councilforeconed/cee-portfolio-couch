App.StandardsPanelComponent = Ember.Component.extend({
  route: function() {
    return 'standards.' + this.get('type');
  }.property('type')
});