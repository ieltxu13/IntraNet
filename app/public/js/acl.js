angular.module('intrApp')

.run(function (RouteFilter, Authentication)
{
    RouteFilter.register('auth1', ['/'], function()
    {
        return Authentication.exists();
    }, 'login');

    RouteFilter.register('auth2', ['/usuarios'], function()
    {
        return Authentication.exists();
    }, 'login');

    RouteFilter.register('mensajes', ['/mensajes'], function()
    {
        return Authentication.exists();
    }, 'login');

    RouteFilter.register('developer', ['/settings'], function()
    {
        return Authentication.isDeveloper();
    }, '/');

    RouteFilter.register('usuariosAdmin', ['/usuarios'], function()
    {
        return Authentication.exists() && Authentication.isAdmin();
    }, '/');
});
