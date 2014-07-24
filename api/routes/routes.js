
var Mensaje = require('../models/mensajes');

module.exports = function(router) {
  router.route('/mensajes')
    //Crear nuevo Mensaje
    .post(function(req, res) {

      var mensaje = new Mensaje();
      mensaje.msg = req.body.msg;

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

      // use our bear model to find the bear we want
      Mensaje.findById(req.params.id, function(err, mensaje) {

        if (err)
          res.send(err);

        mensaje.msg = req.body.msg; 	// update the bears info

        // save the bear
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
}
