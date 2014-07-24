angular.module('intrApp').
controller('inicioCtrl', ['$scope','Mensajes', function($scope, Mensajes) {
    // ============== Declaraciones ============== //
    $scope.mensajes = [];
    $scope.mensaje = {
      msg : '',
    };
    // ============== INIT ============== //
    Mensajes.query(function(m){
      $scope.mensajes = m;
    })

    // ============ FUNCIONES ============= //
    $scope.getMensajes = function() {
      Mensajes.query(function(m){
        $scope.mensajes = m;
      })
    };
    $scope.nuevoMensaje = function() {
      var mensaje = $scope.mensaje;
      Mensajes.save(mensaje, function(mensaje){
        $scope.mensaje.msg = '';
        $scope.getMensajes();
      })
    };

  }
]);
