var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var mensajeSchema = new Schema({
  titulo: String,
  mensaje: String,
  de: String,
  deId : String,
  destinatarios: [{
    nombre: String,
  }],
  general: {type: Boolean, default: false},
  fecha: {type: Date, default: Date.now},
  baja: {type: Date},
  respuestas : [{
    de: String,
    deId: String,
    respuesta: String,
    fecha: {type: Date, default: Date.now}
  }],
});

module.exports = mongoose.model("Mensaje", mensajeSchema);
