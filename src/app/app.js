import 'angular';
import 'app/app.less';

import navbar from 'navbar/navbar';
import snake  from 'snake/snake';
import scores from 'scores/scores';

// register the app module with dependencies
angular.module('app', [
  navbar.name,
  snake.name,
  scores.name
])
  // register the app directive
  .directive('app', () => {
    return {template: require('app/app.html')}
  });

// kick angular!
angular.bootstrap(document, ['app']);
