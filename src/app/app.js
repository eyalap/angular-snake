import 'angular';
import 'app/app.less';

import navbar from 'navbar/navbar.js';
import snake  from 'snake/snake.js';
import scores from 'scores/scores.js';

// register the app module with dependencies
angular.module('app', [navbar.name, snake.name, scores.name])

  // register the app directive
  .directive('app', () => {
    return {templateUrl: 'app/app.html'}
  });

// kick angular!
angular.bootstrap(document, ['app']);
