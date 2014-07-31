angular.module('intrApp').
controller('authCtrl', ['$scope','Authentication','$location', function($scope, Authentication, $location) {
    // ============== Declaraciones ============== //
    $scope.credentials = {
      usuario : '',
      clave : ''
    };

    // ============== INIT ============== //

    // ============ FUNCIONES ============= //
    $scope.login = function() {
      Authentication.login($scope.credentials).then(function(u){
        user = Authentication.getUser();
        $location.path('/');
      }, function(){
        $scope.alert = 'Credenciales Incorrectas';
      })
    };
    $scope.logout = function() {
      Authentication.logout();
      $scope.credetials = {};
      $location.path('/login')
    };
    $scope.isLoggedIn = function() {
      return Authentication.exists();
    };
    $scope.isAdmin = function() {
      return Authentication.isAdmin();
    }
    $scope.getNombre = function() {
      return Authentication.getUser().nombre;
    }
    $scope.getId = function() {
      return Authentication.getUser()._id;
    }

  }
]);
