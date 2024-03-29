
var gulp  = require('gulp');

require('require-dir')('./tasks');

// ---------------
// Build Tasks
// ---------------

// prep dist
gulp.task('build:files',
  gulp.series('clean:dist', 'copy', 'icons', 'clean:app-css'));

// build site
gulp.task('build:dev', 
  gulp.series('build:files', 'styles:dev', 'scripts:dev'));

// build site and minify js/css
gulp.task('build:prod',
  gulp.series('build:files', 'styles:prod', 'scripts:prod'));

// deploy
gulp.task('deploy',
  gulp.series('build:dev', 'upload:deploy'));

// watch
gulp.task('watch',
  gulp.parallel('copy:watch', 'upload:watch', 'scripts:watch', 'styles:watch', 'icons:watch'));

// ---------------
// Dev Tasks
// ---------------

// dev
gulp.task('dev', 
  gulp.series('build:dev', 'watch'));

// storybook
gulp.task('storybook', gulp.series('styles:storybook', 'icons:storybook', 'copy:storybook'));  
gulp.task(
  'watch:storybook',
  gulp.parallel('styles:watch:storybook', 'icons:watch:storybook', 'copy:watch:storybook')
);  

// dev task with initial deploy
gulp.task('dev:deploy',
  gulp.series('build:dev', 'upload:deploy', 'watch'));

// prod
gulp.task('prod', 
  gulp.series('build:prod'));

// default
gulp.task('default', gulp.parallel('dev'));

