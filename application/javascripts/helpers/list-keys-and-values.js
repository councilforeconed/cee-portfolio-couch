Handlebars.registerHelper('list-keys-and-values', function(standards) {
  var result = "<ul>";
	Object.keys(standards).forEach(function(standard) {
    result += '<li><strong>' + standard + '</strong>: ' + standards[standard] + '</li>';
	});
	result += '</ul>';
  return new Handlebars.SafeString(result);
});