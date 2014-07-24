var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var mensajeSchema = new Schema({
  titulo: String,
  mensaje: String,
  destinatarios: [{
    nombre: String,
  }],
  fecha: {type: Date, default: Date.now},
  baja: {type: Date}
});

module.exports = mongoose.model("Mensaje", mensajeSchema);
