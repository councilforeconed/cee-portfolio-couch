Portfolio.PaginationControls = Ember.View.extend({
  templateName: 'pagination',
  didInsertElement: function () {
    Em.$('.pages .previous').addClass('disabled');
  }
});