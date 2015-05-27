export default angular.module('scores', [])
  .directive('scores', scores)

function scores () {
  return {
    restrict: 'E',
    template: require('scores/scores.html'),
    controller: ScoresController
  }
}

class ScoresController {

}
