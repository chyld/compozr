'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
  // ----------------------------------------------------------------------- //
    watch: {
      jade: {
        files: ['<%= yeoman.app %>/{,*/}*.jade'],
        tasks: ['jade']
      },
      less: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less']
      },
      jshint: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{.tmp,<%= yeoman.app %>}/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
  // ----------------------------------------------------------------------- //
    jade: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: '{,*/}*.jade',
          ext: '.html'
        }]
      }
    },
  // ----------------------------------------------------------------------- //
    less: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          dest: '.tmp/styles',
          src: '{,*/}*.less',
          ext: '.css'
        }]
      }
    },
  // ----------------------------------------------------------------------- //
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
  // ----------------------------------------------------------------------- //
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      }
    },
  // ----------------------------------------------------------------------- //
    clean: {
      server: '.tmp'
    },
  });
  // ----------------------------------------------------------------------- //
  grunt.registerTask('server', function () {
    grunt.task.run([
      'clean:server',
      'jade',
      'less',
      'connect:livereload',
      'watch'
    ]);
  });
};
