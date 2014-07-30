angular.module('intrApp')
  .controller('usuariosCtrl',
  ['$scope', 'Usuarios', 'Authentication', '$modal', 'Oficinas',
  function($scope, Usuarios, Authentication, $modal, Oficinas) {
    // ============== Declaraciones ============== //
    $scope.usuarios = [];
    $scope.usuario = {
      nombre: '',
      usuario: '',
      clave: '',
      cargo: '',
      rol: '',
    };
    $scope.mensaje = '';
    $scope.oficinas = Oficinas.oficinas;
    // ============== INIT ============== //
    Usuarios.query(function(u) {
      $scope.usuarios = u;
    });

    // ============ FUNCIONES ============= //
    $scope.getUsuarios = function() {
      Usuarios.query(function(u) {
        $scope.usuarios = u;
      })
    };

    $scope.nuevoUsuario = function() {
      var modalInstance = $modal.open({
        templateUrl: 'templates/usuarioModal.html',
        controller: ModalInstanceCtrl,
        size: 'lg',
        resolve: {
          usuario: function(){return null;},
          oficinas: function(){return $scope.oficinas}
        }
      });

      modalInstance.result.then(function(usuario) {
          console.log(usuario);
          Usuarios.save(usuario, function(usuario) {
            if(usuario.message) {
              $scope.mensaje = "El nombre de usuario ya existe!";
            }
            console.log(usuario);
            $scope.usuario.nombre = '';
            $scope.usuario.usuario = '';
            $scope.usuario.clave = '';
            $scope.usuario.cargo = '';
            $scope.usuario.rol = '';
            $scope.usuario.oficina = '';
            $scope.getUsuarios();
          });
        },
        function() {
          console.log('cancelado');
        });
    }

    $scope.editarUsuario = function(usuario) {
        console.log(usuario);
        var modalInstance = $modal.open({
        templateUrl: 'templates/usuarioModal.html',
        controller: ModalInstanceCtrl,
        size: 'lg',
        resolve: {
          usuario : function(){
            return usuario;
          },
          oficinas: function(){return $scope.oficinas}
        }
      });

      modalInstance.result.then(function(usuario) {
          console.log(usuario);
          Usuarios.update({id : usuario._id},usuario, function(usuario) {
            if(usuario.message) {
              $scope.mensaje = "El nombre de usuario ya existe!";
            }
            console.log(usuario);
            $scope.usuario.nombre = '';
            $scope.usuario.usuario = '';
            $scope.usuario.clave = '';
            $scope.usuario.cargo = '';
            $scope.usuario.rol = '';
            $scope.usuario.oficina = '';
            $scope.getUsuarios();
          });
        },
        function() {
          console.log('cancelado');
        });
    }

    var ModalInstanceCtrl = function($scope, $modalInstance, usuario, oficinas) {
      $scope.usuario = {
        nombre: '',
        usuario: '',
        clave: '',
        cargo: '',
        rol: '',
        oficina: '',
      };
      $scope.oficinas = oficinas;
      $scope.esOficina = false;

      if(usuario){
        $scope.usuario = usuario;
      }

      $scope.toggleOficina = function(){
        $scope.esOficina = ! $scope.esOficina;
      }
      $scope.crear = function() {
        $scope.usuario.clave = $scope.usuario.usuario;
        $scope.usuario.oficina = $scope.usuario.oficina;
        if($scope.esOficina){
          $scope.usuario.rol = 'Oficina';
          $scope.usuario.nombre = $scope.usuario.oficina;
        }
        $modalInstance.close($scope.usuario);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    };
  }]);
