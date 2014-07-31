'use strict';

angular.module('intrApp')
  .factory('Authentication', function Authentication($q, $http, $timeout, $window) {

    var authenticatedUser = null;

    return  {
        requestUser: function(  )
        {
          var deferred = $q.defer();
            if($window.sessionStorage.user && $window.sessionStorage.token) {

              $http.get('http://192.168.1.37:3000/api/usuarios/'+$window.sessionStorage.user).success(function(user)
              {
                  if(user)
                  {
                      authenticatedUser = user;
                      deferred.resolve(user);
                  }
                  else
                  {
                      deferred.reject('Error al cargar usuario');
                  }
              }).error(function(error)
              {
                  deferred.reject(error);
              });

            }
            else
            {
                deferred.reject();
            }
         return deferred.promise;
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
            $http.post('http://192.168.1.37:3000/auth', credentials).success(function(data)
            {
                if(data.user)
                {
                    authenticatedUser = data.user;
                    $window.sessionStorage.token = data.token;
                    $window.sessionStorage.user = data.user._id;
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
            $window.sessionStorage.token = null;
            $window.sessionStorage.user = null;
        },

        isAdmin: function()
        {
            return this.exists() && authenticatedUser.rol == 'Administrador';
        }
    }
  });
