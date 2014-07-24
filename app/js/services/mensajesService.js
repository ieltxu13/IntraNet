angular.module('intrApp')
.factory('Mensajes',['$resource', function($resource) {
  return $resource('http://localhost:3000/api/mensajes/:id',null,
    {
      'update': {method : 'PUT'}
    }
  );
}]);
