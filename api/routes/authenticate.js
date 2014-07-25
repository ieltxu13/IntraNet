  var jwt        = require('jsonwebtoken');
  var Usuario = require('../models/usuario');

module.exports = function(authenticate){

  authenticate.route('/')

  .post(function (req, res) {
    var user = 'nada';
    Usuario.findOne({'usuario' : req.body.usuario, 'clave' : req.body.clave}, 'nombre usuario cargo oficina ',function(err,u){
      if(err)
        res.send(err);
      user = u;
      console.log(user);

      if(user) {
        // We are sending the profile inside the token
        var token = jwt.sign(user, 'sarabaram', { expiresInMinutes: 60*5 });
        res.json({ token: token, user : user });
      } else {
        res.send(401, "Credenciales Incorrectas");
      }

})
})

};
