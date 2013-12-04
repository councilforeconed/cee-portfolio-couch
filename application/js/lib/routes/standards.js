App.StandardsEconomicsRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/standards/_list/lessons-by-standard/count-economics?reduce=false&start_key=' + params.standard_id + '&end_key=' + params.standard_id);
  },
  renderTemplate: function(controller, model) {
    this.render('lessons', { into: 'application' });
  }
});

App.StandardsPersonalFinanceRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/standards/_list/lessons-by-standard/count-personal-finance?reduce=false&start_key=' + params.standard_id + '&end_key=' + params.standard_id);
  },
  setupController: function (controller, model) {
    controller.set('standard', model[0].standard);
    controller.set('title', 'Lessons Addressing Personal Finance Standard ' + controller.get('standard'));
    controller.set('model', model);
  },
  renderTemplate: function(controller, model) {
    this.render('lessons', { into: 'application' });
  }
});

App.StandardsCommonCoreRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/_design/common-core/_list/lessons-for-standard/standard-counts?reduce=false&start_key="' + params.standard_id + '"&end_key="' + params.standard_id + '"')
  },
  setupController: function (controller, model) {
    controller.set('standard', model[0].standard);
    controller.set('title', 'Lessons for Common Core Standard ' + controller.get('standard'));
    controller.set('model', model);
  },
  renderTemplate: function(controller, model) {
    this.render('lessons', { into: 'application' });
  }
});