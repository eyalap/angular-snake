export default angular.module('scores', [])
  .directive('scores', scores)

function scores () {
  return {
    restrict: 'E',
    templateUrl: 'scores/scores.html',
    controller: ScoresController
  }
}

class ScoresController {

}
