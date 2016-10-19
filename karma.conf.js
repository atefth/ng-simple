module.exports = function(config) {
  config.set({
    // Use cwd as base path
    basePath: '',

    // Include mocha test framework and chai assertions
    frameworks: ['mocha', 'chai'],

    // Include the test and source files
    files: ['vendor/jquery/dist/jquery.min.js', 'vendor/bootstrap/dist/js/bootstrap.min.js', 'vendor/angular/angular.js', 'vendor/angular-bootstrap/ui-bootstrap.min.js', 'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js', 'vendor/angular-sanitize/angular-sanitize.min.js', 'scripts/*.js', 'spec/*.js'],

    // Use built-in 'progress' reporter
    reporters: ['progress'],

    // Boilerplate
    urlRoot : '/__karma__/',
    port: 8080,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,

    /* Karma can watch the file system for changes and
     * automatically re-run tests. Making karma do it
     * is more efficient than using gulp because karma
     * can re-use the same browser process. Set this to
     * true and `singleRun` to false to run tests
     * continuously */
    autoWatch: false,

    // Set the browser to run
    browsers: ['Chrome'],

    // See autoWatch
    singleRun: true,

    // Consider browser as dead if no response for 5 sec
    browserNoActivityTimeout: 5000
  });
};