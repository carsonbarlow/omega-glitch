var gulp = require('gulp');
var Server = require('karma').Server;




gulp.task('default', function() {
  // place code for your default task here
  console.log('doing stuff');
});


gulp.task('test', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});