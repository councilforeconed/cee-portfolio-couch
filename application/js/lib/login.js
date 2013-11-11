if (window.location.host === "localhost:3000") {
  $.couch.urlPrefix = 'http://portfol.io:5984';
}

var $globalNotifications = $('#global-notifications');

function displayLoginInformation(callback) {
  util.ifLoggedIn(
  function successfulLogin(username) {
    $globalNotifications.children().remove();
    var loginTemplate = Handlebars.compile($('#logged-in-template').html());
    $globalNotifications.append(loginTemplate({
      username: username
    }));
  },
  function unsuccessfulLogin() {
    $globalNotifications.children().remove();
    var loginTemplate = Handlebars.compile($('#login-template').html());
    $globalNotifications.append(loginTemplate());
    
    $("#login button[type=submit]").on('click submit', function (e) {
      e.preventDefault();
      
      var username = $('#username').val();
      var password = $('#password').val();
      
      if (username || password) {
        $.couch.login({
          name: username,
          password: password,
          success: displayLoginInformation,
          error: loginProblem('Your username, your password, or both were incorrect.')
        });
      } else {
        loginProblem('You must provide a username and password.')
      }
    })
  },
  function loginError() {
    loginProblem('There was an unknown issue. Try again.')
  },
  function customCallback() {
     if (typeof callback === "function") callback();
  }
)
};

function loginProblem(error) {
  var alertTemplate = Handlebars.compile($('#alert-template').html());
  $globalNotifications.prepend(alertTemplate({
    title: 'There was an issue logging you in.',
    content: error,
    type: 'alert-danger'
  }));
}

displayLoginInformation();