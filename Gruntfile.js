module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      couch: {
        src: ['Gruntfile.js', 'couch.js'],
        options: {
          jshintrc: '.jshintrc-couch'
        }
      }
    },
    exec: {
      push: {
        command: './node_modules/couchapp/bin.js push <%= pkg.main %> "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/portfolio"',
        stdout: true
      },
      serve: {
        command: './node_modules/couchapp/bin.js serve <%= pkg.main %> http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/portfolio -d application',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint:couch']);
  grunt.registerTask('push', ['jshint:couch', 'exec:push']);

};