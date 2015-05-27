import 'navbar/navbar.less';

export default angular.module('navbar', [])
  .directive('navbar', navbar);

function navbar() {
  return {
    restrict: 'E',
    template: require('navbar/navbar.html'),
    controller: NavbarController
  }
}

class NavbarController {

  constructor() {

  }

}


