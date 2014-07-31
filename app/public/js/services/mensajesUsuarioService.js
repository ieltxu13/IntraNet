'use strict';

angular.module('intrApp')
  .factory('MensajesUsuarios', function MensajesUsuarios($http, Authentication){

    return  {
        getMensajesUsuario: function()
        {
          return $http.get('http://192.168.1.37:3000/api/mensajes-usuario/'+Authentication.getUser()._id);

        }
    }
  });
