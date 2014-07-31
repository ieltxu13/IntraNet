angular.module('intrApp').
controller('chatCtrl',['$scope','Authentication','Chat',
function($scope, Authentication, Chat) {

  io.connect();

  $scope.conectar = function() {

  };
  $scope.desconectar = function() {

  };
  $scope.getConectados = function() {

  };
  $scope.mostrarConectados = function() {

  };
  $scope.ocultarConectados = function() {

  };
  $scope.nuevaConversacion = function() {

  };
  $scope.ocultarConversacion = function() {

  };

}]);
