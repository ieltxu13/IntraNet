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
  }
]);
