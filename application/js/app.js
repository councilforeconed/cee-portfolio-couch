App = Ember.Application.create();

Ember.Router.map(function () {
  this.resource('publications', function () {
    this.resource('publication', { path: ':publication_id' });
  });
  
  this.resource('lessons', function () {
    this.resource('lesson', { path: ':lesson_id' });
  });
  
  this.resource('concepts', function () {
    this.resource('concept', { path: ':concept_id' });
  });
  
  this.resource('standards', function () {
    this.route('economics', { path: 'economics/:standard_id'});
    this.route('personalFinance', { path: 'personal-finance/:standard_id'});
    this.route('commonCore', { path: 'common-core/:standard_id' });
  });
  
  this.resource('discussion', function () {
    this.route('ratings');
    this.route('comments');
  });
});