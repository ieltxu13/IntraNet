'use strict';

angular.module('intrApp')
  .controller('loadingCtrl', function ($scope, Application, $location) {

    Application.registerListener(function()
    {
        // When application is ready then redirect to the main page
        $location.path('/');
    });
  });
