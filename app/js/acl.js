angular.module('intrApp')

.run(function (RouteFilter, Authentication)
{
    RouteFilter.register('auth', ['/'], function()
    {
        return Authentication.exists();
    }, 'login');

    RouteFilter.register('mensajes', ['/login'], function()
    {
        return ! Authentication.exists();
    }, '/');

    RouteFilter.register('developer', ['/settings'], function()
    {
        return Authentication.isDeveloper();
    }, '/');
});
