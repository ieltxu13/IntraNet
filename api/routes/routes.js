var Mensaje = require('../models/mensajes');
var Usuario = require('../models/usuario');

module.exports = function(router) {
  router.route('/mensajes')
  //Crear nuevo Mensaje
  .post(function(req, res) {
    var mensaje = new Mensaje();
    mensaje.mensaje = req.body.mensaje;
    mensaje.destinatarios = req.body.destinatarios;
    mensaje.titulo = req.body.titulo;
    mensaje.general = req.body.general;
    mensaje.de = req.body.de;
    mensaje.deId = req.body.deId;
    mensaje.save(function(err, mensaje) {
      if (err)
        res.send(err);
      console.log(req.body)
      if (req.body.destinatarios.length > 0) {
        req.body.destinatarios.forEach(function(destinatario) {
          Usuario.findById(destinatario._id, function(err, usuario) {
            if (err)
              console.log(err);
            usuario.mensajes.push({
              id: mensaje._id
            })
            usuario.save(function(err, usuario) {
              if (err)
                console.log(err);
            });
          });
        });
      }
      res.status(201);
      res.json(mensaje);
    });

  })
  //Get todos los mensajes
  .get(function(req, res) {
    Mensaje.find({general : true},null,{sort: {fecha: -1}},function(err, mensajes) {
      if (err)
        res.send(err);
      res.json(mensajes);
    });
  });

  router.route('/mensajes-usuario/:usuario')
  //Get Mensaje por Id
  .get(function(req, res) {
    var mensajes = [];
    Usuario.findById(req.params.usuario, function(err, usuario) {
      if (err)
        console.log(err);
      var mensajescount = 0;
      mensajescount = usuario.mensajes.length;

      if (mensajescount != 0) {
        function buscarMensajesUsuario(index) {
          if (index > 0) {
            Mensaje.findById(usuario.mensajes[mensajescount - index].id, function(err, mensaje) {
              if (err)
                console.log(err);
              mensajes.push(mensaje);
              index--;
              buscarMensajesUsuario(index);
            });
          } else {
            res.json(mensajes);
          }
        }
        buscarMensajesUsuario(mensajescount);
      } else {
        res.json(mensajes);
      }
    })
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
      var respuesta = {
        de : req.body.de,
        deId : req.body.deId,
        respuesta : req.body.respuesta
      };
      mensaje.respuestas.push(respuesta);
      mensaje.save(function(err, mensaje) {
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
      res.json({
        message: 'Successfully deleted'
      });
    });
  });

  router.route('/usuarios')
    .post(function(req, res) {
      var usuario = new Usuario();
      usuario.nombre = req.body.nombre;
      usuario.usuario = req.body.usuario;
      usuario.cargo = req.body.cargo;
      usuario.rol = req.body.rol;
      usuario.clave = req.body.clave;
      usuario.save(function(err, usuario) {
        if (err)
          res.send(err);
        res.status(201);
        res.json(usuario);
      });
    })

  //Get todos los usuarios
  .get(function(req, res) {
    Usuario.find({},'nombre usuario oficina cargo rol',function(err, usuarios) {
      if (err)
        res.send(err);
      res.json(usuarios);
    });
  });

  router.route('/usuarios/:id')
  //Get Usuario por Id
  .get(function(req, res) {
    Usuario.findById(req.params.id,'nombre usuario oficina cargo rol', function(err, usuario) {
      if (err)
        res.send(err);
      res.json(usuario);
    });
  })
  //Modificar Usuarios
  .put(function(req, res) {
    Usuario.findById(req.params.id,function(err, usuario) {
      if (err)
        res.send(err);
      usuario.nombre = req.body.nombre;
      usuario.usuario = req.body.usuario;
      usuario.clave = req.body.clave;
      usuario.cargo = req.body.cargo;
      usuario.oficina = req.body.oficina;
      usuario.rol = req.body.rol;
      usuario.ultimoAcceso = req.body.ultimoAcceso;
      usuario.save(function(err, usuario) {
        if (err)
          res.send(err);
        res.json(usuario);
      });
    });
  })
  // Borrar Usuarios
  .delete(function(req, res) {
    Usuario.remove({
      _id: req.params.id
    }, function(err, usuario) {
      if (err)
        res.send(err);
      res.json({
        message: 'Successfully deleted'
      });
    });
  });

  router.route('/busquedausuarios/:parametro')
    .get(function(req, res) {
      Usuario.find({
        $or: [{
          'usuario': new RegExp(req.params.parametro, "i")
        }, {
          'nombre': new RegExp(req.params.parametro, "i")
        }]
      },'nombre usuario oficina cargo rol', function(err, usuario) {
        if (err)
          res.send(err);
        res.json(usuario);
      });
    })

}
