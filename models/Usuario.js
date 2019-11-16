const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema =  new Schema({
    username: {type: String, unique: true},
    password: String,
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: String,
    numero_tarjeta_credito: String
}, {collection: 'Usuario'});

module.exports = mongoose.model('Usuario',schema);