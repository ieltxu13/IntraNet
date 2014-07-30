angular.module('intrApp')
.factory('BusquedaUsuarios',['$resource', function($resource) {
  return $resource('http://localhost:3000/api/busquedausuarios/:parametro',{parametro:'@parametro'});
}]);
