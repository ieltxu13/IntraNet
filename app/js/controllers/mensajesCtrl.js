angular.module('intrApp').
controller('mensajesCtrl', ['$scope','$http','Mensajes','BusquedaUsuarios', 'Authentication','MensajesUsuarios',
 function($scope, $http, Mensajes, BusquedaUsuarios, Authentication, MensajesUsuarios) {
    // ============== Declaraciones ============== //
    $scope.alert = '';
    $scope.mensajes = [];
    $scope.mensaje = {
      mensaje : '',
      destinatarios : [],
      de: '',
      deId: ''
    };
    // ============== INIT ============== //
    MensajesUsuarios.getMensajesUsuario()
    .success(function(data){
      $scope.mensajes = data;
    });
    $scope.mensaje.de = Authentication.getUser().nombre + ' - ' +
                        Authentication.getUser().oficina;
    $scope.mensaje.deId = Authentication.getUser()._id;

    // ============ FUNCIONES ============= //
    $scope.getMensajes = function() {
      MensajesUsuarios.getMensajesUsuario()
      .success(function(data){
        $scope.mensajes = data;
      });
    };

    $scope.nuevoMensaje = function() {
      var mensaje = $scope.mensaje;
      Mensajes.save(mensaje, function(mensaje){
        $scope.mensaje.mensaje = '';
        $scope.getMensajes();
      })
    };
    $scope.borrarMensaje = function(id) {
      Mensajes.remove({id : id}, function(mensaje){
          $scope.getMensajes();
          $scope.alert = '';
          $scope.alert = "Mensaje Borrado";
      })
    }
    $scope.getUsuarios = function(query){
      return $http.get('http://192.168.1.37:3000/api/busquedausuarios/'+query);
    }

    $scope.responder = function(mensaje,resp){
      var respuesta = {
        de : Authentication.getUser().nombre + ' - ' +
                            Authentication.getUser().oficina,
        deId : Authentication.getUser()._id,
        respuesta : resp,
      }
      Mensajes.update({id : mensaje._id},respuesta, function(mensaje){
        $scope.getMensajes();
      })
    }
  }
]);
