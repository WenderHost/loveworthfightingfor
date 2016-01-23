module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          cleancss: false,
          optimization: 2,
          relativeUrls: true
        },
        files: {
          // target.css file: source.less file
          'css/style.css': 'css/less/style.less'
        }
      },
      production: {
        options: {
          compress: true,
          cleancss: true,
          optimization: 2,
          relativeUrls: true
        },
        files: {
          // target.css file: source.less file
          'css/style.css': 'css/less/style.less'
        }
      }
    },
    watch: {
      less:{
        files: ['css/less/*.less','index.html','js/*.js'], // which files to watch
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production']);
  grunt.registerTask('builddev', ['less:development']);
};