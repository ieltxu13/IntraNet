angular.module('intrApp')
.factory('Usuarios',['$resource', function($resource) {
  return $resource('http://192.168.1.37:3000/api/usuarios/:id',null,
    {
      'update': {method : 'PUT'}
    }
  );
}]);
