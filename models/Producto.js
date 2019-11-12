const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema =  new Schema({
    nombre: {type: String, unique: true},
    precio: Double,
    cantidad: Integer,
    tiempo_entrega: Date,
    descripcion: String
});

module.exports = mongoose.model('Producto',schema);