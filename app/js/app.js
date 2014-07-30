angular.module('intrApp',
    [
      'ngRoute',
      'ngResource',
      'ui.bootstrap',
      'ui.bootstrap.typeahead',
      'decipher.tags',
      'ngTagsInput'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {templateUrl: 'templates/inicio.html', controller: 'inicioCtrl'});
        $routeProvider.when('/loading', {templateUrl: 'templates/loading.html', controller: 'loadingCtrl'});
        $routeProvider.when('/mensajes', {templateUrl: 'templates/mensajes.html', controller: 'mensajesCtrl'});
        $routeProvider.when('/login', {templateUrl: 'templates/login.html', controller: 'authCtrl'});
        $routeProvider.when('/usuarios', {templateUrl: 'templates/usuarios.html', controller: 'usuariosCtrl'});
        $routeProvider.otherwise('/');
    }])
    .run(function (Authentication, Application, $rootScope, $location, RouteFilter) {

    Authentication.requestUser().then(function(){
      Application.makeReady();
    }, function(){
      Application.makeReady();
      $location.path('login')
    });

    $rootScope.$on('$locationChangeStart', function(scope, next, current) {

      if($location.path() === '/loading') {
        return;
      }
      if(! Application.isReady())
      {
        $location.path('loading');
      }

      RouteFilter.run($location.path());
    })
  });
