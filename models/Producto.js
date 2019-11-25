const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema =  new Schema({
    nombre: {type: String, unique: true},
    precio: Number,
    cantidad: Number,
    tiempo_entrega: Number,
    descripcion: String,
    imagen_url: String
});

module.exports = mongoose.model('Producto',schema);