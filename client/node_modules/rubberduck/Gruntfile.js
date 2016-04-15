module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    simplemocha: {
      lib: {
        src: ['test/**/*.test.js']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      lib: ['lib/**/*.js', 'Gruntfile.js'],
      test: ['test/**/*.js']
    },
    release: {}
  });

  grunt.registerTask('default', 'test');
  grunt.registerTask('test', [ 'jshint', 'simplemocha' ]);

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-release');
};