module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'application/js/vendor/jquery-*.js',
          'application/js/vendor/handlebars-*.js',
          'application/js/vendor/ember-*.js',
          'application/js/vendor/jquery.migrate.js',
          'application/js/vendor/jquery.couch.js',
          'application/js/vendor/chart.js',
          'application/js/vendor/lodash.js',
          'application/js/app.js',
          'application/js/lib/*.js',
          'application/js/lib/**/*.js',
          'application/js/lib/**/**/*.js',
          'application/js/templates.js'
        ],
        dest: 'application/<%= pkg.name %>.js'
      }
    },
    ember_handlebars: {
      compile: {
        options: {
          namespace: 'Ember.TEMPLATES',
          processName: function(filePath) {
            return filePath.match(/application\/templates\/(.+)\.hbs/)[1];
          }
        },
        files: {
          'application/js/templates.js': ['application/templates/**/*.hbs']
        },
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'application/js/lib/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          indent: 2,
          couch: true,
          document: true
        }
      }
    },
    watch: {
      files: [
        'Gruntfile.js',
        'application/js/lib/*.js',
        'application/js/lib/**/*.js',
        'application/js/lib/**/**/*.js',
        'application/js/app.js',
        'application/templates/**/*.hbs',
        'application/index.html'
      ],
      tasks: ['jshint', 'ember_handlebars', 'concat']
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  
  grunt.registerTask('default', ['jshint', 'ember_handlebars', 'concat']);
};