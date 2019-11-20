const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    productoId: String,
    productoNombre: String,
    usuarioId: String,
    usuarioNombre: String,
    fechaCompra: Date
}, {collection: 'Recibo'});

module.exports = mongoose.model('Recibo', schema);