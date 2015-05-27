import 'navbar/navbar.less';

export default angular.module('navbar', [])
  .directive('navbar', navbar);

function navbar() {
  return {
    restrict: 'E',
    template: require('navbar/navbar.html'),
    controller: NavbarController,
    controllerAs: 'navbar'
  }
}

class NavbarController {

  constructor($scope) {
    this.scope = $scope;
  }

  startGame() {
    this.scope.$broadcast('game:start');
  }

}

NavbarController.$inject=['$scope'];
