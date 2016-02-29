module.exports = {

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine', 'requirejs'],

  // https://karma-runner.github.io/0.12/config/files.html

  // list of files / patterns to load in the browser
  files: [
    {pattern: 'src/vendor/**/*.?(min.js|map|css)', included: false, served: true, watched:false},

    // load app source and test's specs
    'src/require.config.js',
    'tools/tests/require.config.js',

    // app source and tests specs
    {pattern: 'src/**/*.?(js|css|html)', included: false, served: true}
  ],

  // list of files to exclude
  exclude: [
    'src/require.mock.load.js',
    'src/**/mock/**/*'
  ],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'src/**/*.html': ['ng-html2js'],
    // source files, that you wanna generate coverage for
    // do not include tests or libraries
    // (these files will be instrumented by Istanbul)
    '{src,src/!(vendor)/!(tests){,/!(tests){,/!(tests){,/!(tests)}}}}/!(package).js': ['coverage']
  },

  ngHtml2JsPreprocessor: {
    // strip this from the file path
    stripPrefix: 'src/'
  },

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['PhantomJS', 'Chrome', 'Firefox'],

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  logLevel: 'INFO',

  // web server port
  port: 9876

};
