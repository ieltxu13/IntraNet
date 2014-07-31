angular.module('intrApp')
.factory('Mensajes',['$resource', function($resource) {
  return $resource('http://192.168.1.37:3000/api/mensajes/:id',null,
    {
      'update': {method : 'PUT'}
    }
  );
}]);
