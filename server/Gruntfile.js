module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
  // ----------------------------------------------------------------------- //
    watch: {
      jshint: {
        files: ['{init,lib,models,routes}/{,*/}*.js', 'app.js', 'Gruntfile.js'],
        tasks: ['jshint']
      }
    },
  // ----------------------------------------------------------------------- //
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['{init,lib,models,routes}/{,*/}*.js', 'app.js', 'Gruntfile.js']
    }
  });
  // ----------------------------------------------------------------------- //
  grunt.registerTask('server', function () {
    grunt.task.run([
      'watch'
    ]);
  });
};
