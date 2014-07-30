angular.module('intrApp').
controller('inicioCtrl', ['$scope','$http', 'Mensajes','Usuarios','BusquedaUsuarios', 'Authentication',
 function($scope, $http, Mensajes, Usuarios, BusquedaUsuarios, Authentication) {
    // ============== Declaraciones ============== //
    $scope.alert = '';
    $scope.mensajes = [];
    $scope.mensaje = {
      mensaje : '',
      titulo : '',
      destinatarios : [],
      general : false,
      de: '',
      deId: ''
    };
    // ============== INIT ============== //
    Mensajes.query(function(m){
      $scope.mensajes = m;
    })
    $scope.mensaje.de = Authentication.getUser().nombre + ' - ' +
                        Authentication.getUser().oficina;
    $scope.mensaje.deId = Authentication.getUser()._id;

    // ============ FUNCIONES ============= //
    $scope.getMensajes = function() {
      Mensajes.query(function(m){
        $scope.mensajes = m;
      })
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
