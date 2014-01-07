module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'application/javascripts/vendor/modernizr.js',
          'application/javascripts/vendor/jquery-*.js',
          'application/javascripts/vendor/bootstrap.min.js',
          'application/javascripts/vendor/handlebars-*.js',
          'application/javascripts/vendor/ember-*.js',
          'application/javascripts/vendor/jquery.migrate.js',
          'application/javascripts/vendor/jquery.couch.js',
          'application/javascripts/app.js',
          'application/javascripts/router.js',
          'application/javascripts/components/*.js',
          'application/javascripts/controllers/*.js',
          'application/javascripts/helpers/*.js',
          'application/javascripts/models/*.js',
          'application/javascripts/routes/*.js',
          'application/javascripts/templates/*.js',
          'application/javascripts/views/*.js',
        ],
        dest: 'application/<%= pkg.name %>.js'
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          namespace: 'Ember.TEMPLATES',
          processName: function(filePath) {
            return filePath.match(/application\/javascripts\/templates\/(.+)\.hbs/)[1];
          }
        },
        files: {
          'application/javascripts/templates/templates.js': ['application/javascripts/templates/**/*.hbs',]
        },
      }
    },
    watch: {
      files: [
        'Gruntfile.js',
        'couch.js',
        'application/index.html',
        'application/javascripts/templates/**/*.hbs',
        'application/javascripts/**/*.js',
        'application/stylesheets/**/*.css'
      ],
      tasks: ['ember_handlebars', 'concat']
    },
    jshint: {
      couch: {
        src: ['Gruntfile.js', 'couch.js'],
        options: {
          "node": true,
          "couch": true,
          "devel": true,
          "trailing": true,
          "eqeqeq": true
        }
      },
      ember: {
        src: ['Gruntfile.js', 'application/javascripts/**/*.js', '!application/javascripts/templates/*.js', '!application/javascripts/vendor/*.js'],
        options: {
         "jquery": true,
         "eqeqeq": true,
         "trailing": true
        }
      }
    },
    exec: {
      push: {
        command: './node_modules/couchapp/bin.js push <%= pkg.main %> "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/portfolio"',
        stdout: true
      },
      remotePush: {
        command: './node_modules/couchapp/bin.js push <%= pkg.main %> "http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@stevekinney.iriscouch.com:5984/portfolio"',
        stdout: true
      },
      serve: {
        command: './node_modules/couchapp/bin.js serve <%= pkg.main %> http://$COUCHDB_USERNAME:$COUCHDB_PASSWORD@localhost:5984/portfolio -d application',
        stdout: true
      },
      loginLocal: {
        command: "curl -vX POST http://localhost:5984/_session -H 'Content-Type: application/x-www-form-urlencoded' -d \"name=$COUCHDB_USERNAME&password=$COUCHDB_PASSWORD\"",
        stdout: true
      },
      loginRemote: {
        command: "curl -vX POST http://stevekinney.iriscouch.com:5984/_session -H 'Content-Type: application/x-www-form-urlencoded' -d \"name=$COUCHDB_USERNAME&password=$COUCHDB_PASSWORD\"",
        stdout: true
      },
      replicate: {
        command: 'curl -X POST http://localhost:5984/_replicate  -d \'{"source":"http://localhost:5984/portfolio", "target":"http://stevekinney.iriscouch.com/portfolio"}\' -H "Content-Type: application/json"',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint:ember', 'jshint:concat']);
  grunt.registerTask('push', ['exec:push']);
  grunt.registerTask('serve', ['exec:serve']);
  grunt.registerTask('cloud', ['exec:loginLocal', 'exec:loginRemote', 'exec:replicate']);
  grunt.registerTask('cpush', ['exec:loginLocal', 'exec:loginRemote', 'exec:remotePush']);

};