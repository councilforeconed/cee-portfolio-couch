var Authentication = function (element) {
  var self = this;
  self.element = $(element);
  
  if (!(self instanceof Authentication)) {
    return new Authentication(element);
  }
  
  function compileTemplate(id, options) {
    var template = $(id).html();
    var compile = Handlebars.compile(template);
    return $(compile(template, options)).hide();
  }
  
  self.loginForm = compileTemplate('#login-form-template').appendTo(this.element);
  self.loginStatus = compileTemplate('#login-status-template').appendTo(this.element);
  
  self.loginForm.find('button[type=submit]').on('click submit', function (e) {
    e.preventDefault();
    var username = $(this).parents('form').find('#username').val();
    var password = $(this).parents('form').find('#password').val();
    if (self.validateLoginFormValues.call(self)) {
      $.couch.login({
        name: username,
        password: password,
        success: self.displayLoginStatus.bind(self, username),
        error: function (status, error, reason) { alert(reason); }
      });
    } else {
      alert('You must provide a username and password.');
    }
  });
  
  self.loginStatus.find('button').on('click submit', function (e) {
    e.preventDefault();
    $.couch.logout({
      success: self.displayLoginForm.bind(self),
      error: function (status, error, reason) { alert(reason); }
    });
  });
  
  self.checkLoginStatus(self.displayLoginStatus.bind(this), self.displayLoginForm.bind(this));

  return this;
}

Authentication.prototype.checkLoginStatus = function (loggedInCallback, notLoggedInCallback, failureCallback) {
  $.couch.session({
    success: function (response) {
      var username = response.userCtx.name;
      if (username) {
        if (typeof loggedInCallback === "function") loggedInCallback(username);
      } else {
        if (typeof notLoggedInCallback === "function") notLoggedInCallback();
      }
    },
    error: function (response) {
      if (typeof failureCallback === "function") failureCallback(username);
    }
  });
}

Authentication.prototype.displayLoginForm = function () {
  this.loginStatus.hide();
  this.loginForm.show();
}

Authentication.prototype.displayLoginStatus = function (username) {
  this.loginForm.hide();
  this.clearLoginFormValues();
  this.loginStatus.find('.username').text(username);
  this.loginStatus.show();
}

Authentication.prototype.validateLoginFormValues = function () {
  return !!(this.loginForm.find('input#username').val() && this.loginForm.find('input#password').val());
}

Authentication.prototype.clearLoginFormValues = function () {
  this.loginForm.find('input').val('');
}

Authentication.prototype.ifLoggedIn = function (callback) {
  this.checkLoginStatus(callback, function () {
    alert('You must be logged in to do that.')
  });
}

var auth = new Authentication('#authentication');