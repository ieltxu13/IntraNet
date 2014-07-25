var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuarioSchema = new Schema({
  nombre: String,
  usuario: String,
  cargo: String,
  clave: String,
  oficina: String,
  mensajes: [{
    id : String,
    leido : {type: Date},
    fechaLeido: {type: Date}
  }],
  activo: Boolean,
  alta: {type: Date, default: Date.now},
  baja: {type: Date},
  ultimoAcceso : {type: Date}
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
