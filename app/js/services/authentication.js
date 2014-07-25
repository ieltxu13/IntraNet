'use strict';

angular.module('intrApp')
  .factory('Authentication', function Authentication($q, $http, $timeout, $window) {

    var authenticatedUser = null;

    return  {
        requestUser: function(  )
        {
              if($window.sessionStorage.user && $window.sessionStorage.token) {
                authenticatedUser = $window.sessionStorage.user;
              }
        },

        getUser: function()
        {
            return authenticatedUser;
        },

        exists: function()
        {
            return authenticatedUser != null;
        },

        login: function(credentials)
        {
            var deferred = $q.defer();
            console.log(credentials);
            $http.post('http://localhost:3000/auth', credentials).success(function(data)
            {
                if(data.user)
                {
                    authenticatedUser = data.user;
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user;
                    deferred.resolve(data.user);
                }
                else
                {
                    deferred.reject('Given credentials are incorrect');
                }

            }).error(function(error)
            {
                deferred.reject(error);
            });

            return deferred.promise;
        },


        logout: function()
        {
            authenticatedUser = null;
        },

        isDeveloper: function()
        {
            return this.exists() && authenticatedUser.type == 'developer';
        }
    }
  });
