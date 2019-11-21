const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema =  new Schema({
    username: {type: String, unique: true},
    password: String,
    nombre: String,
    apellido: String,
    telefono: String,
    correo_institucional: String
}, {collection: 'Admins'});

module.exports = mongoose.model('Admin',schema);