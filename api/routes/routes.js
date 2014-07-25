var Mensaje = require('../models/mensajes');
var Usuario = require('../models/usuario');

module.exports = function(router) {
  router.route('/mensajes')
    //Crear nuevo Mensaje
    .post(function(req, res) {
      var mensaje = new Mensaje();
      mensaje.mensaje = req.body.mensaje;
      mensaje.save(function(err, mensaje) {
        if (err)
          res.send(err);
        res.status(201);
        res.json(mensaje);
      });

    })
    //Get todos los mensajes
    .get(function(req, res) {
      Mensaje.find(function(err, mensajes) {
        if (err)
          res.send(err);
        res.json(mensajes);
      });
    });

  router.route('/mensajes/:id')
    //Get Mensaje por Id
    .get(function(req, res) {
      Mensaje.findById(req.params.id, function(err, mensaje) {
        if (err)
          res.send(err);
        res.json(mensaje);
      });
    })
    //Modificar Mensajes
    .put(function(req, res) {
      Mensaje.findById(req.params.id, function(err, mensaje) {
        if (err)
          res.send(err);
        mensaje.mensaje = req.body.mensaje; 	// update the bears info
        mensaje.save(function(err,mensaje) {
          if (err)
            res.send(err);
          res.json(mensaje);
        });
      });
    })
    // Borrar Mensajes
    .delete(function(req, res) {
      Mensaje.remove({
        _id: req.params.id
      }, function(err, mensaje) {
        if (err)
          res.send(err);
        res.json({ message: 'Successfully deleted' });
      });
    });

  router.route('/usuarios')
    .post(function(req, res) {
      var usuario = new Usuario();
      usuario.usuario = req.body.usuario;
      usuario.clave   = req.body.clave;
      usuario.save(function(err, usuario) {
        if (err)
          res.send(err);
        res.status(201);
        res.json(usuario);
      });
    });
}
