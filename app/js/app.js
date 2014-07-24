angular.module('intrApp',
    [
      'ngRoute',
      'ngResource'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {templateUrl: 'templates/inicio.html', controller: 'inicioCtrl'});
        $routeProvider.otherwise('/');
    }]);
