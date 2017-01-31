module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          cleancss: false,
          optimization: 2,
          relativeUrls: true,
          sourceMap: true,
          sourceMapFilename: 'assets/css/style.css.map',
          sourceMapBasepath: 'assets/less',
          sourceMapURL: 'style.css.map',
          sourceMapRootpath: '../../assets/less'
        },
        files: {
          // target.css file: source.less file
          'assets/css/style.css': 'assets/less/style.less'
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
          'assets/css/style.css': 'assets/less/style.less'
        }
      }
    },
    watch: {
      less:{
        files: ['assets/less/*.less','index.html','assets/js/*.js'], // which files to watch
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      }
    },
    asset_cachebuster: {
      options: {
        buster: Date.now(),
        ignore: [
          '//code.jquery.com',
          '//cdnjs.cloudflare.com',
          '//html5shiv.googlecode.com',
          'assets/images/'
        ],
        htmlExtension: 'html'
      },
      buildindex: {
        files: {
          'index.html': ['index.html']
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less:production','asset_cachebuster']);
  grunt.registerTask('builddev', ['less:development','asset_cachebuster']);
};