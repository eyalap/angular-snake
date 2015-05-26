export default angular.module('navbar', [])
  .directive('navbar', navbar);

function navbar () {
  return {
    restrict: 'E',
    templateUrl: 'navbar/navbar.html',
    controller: NavbarController
  }
}

class NavbarController {

}


