const Recibo = require('../../models/Recibo');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getOne = (req, res, next) => {
    debug("Search recibo", req.params);
    Recibo.findOne({
        productoId: req.body.productoId,
        usuarioId: req.body.usuarioId
    })
        .then((foundRecibo) => {
            if (foundRecibo) {
                console.log("found");
                return res.status(200).json(foundRecibo);
            }
            else
                return res.status(400).json(error);
        })
        .catch((err) => {
            next(err);
        })
}

module.exports.makeRecibo = (req, res, next) => {
    debug("Recibo", { body: req.body });
    Recibo.findOne({
        _id: req.body._id
    })
        .then((foundRecibo) => {
            if (foundRecibo) {
                debug("Recibo ya existente");
                throw new Error(`Recibo ya existente ${req.body.usuarioNombre} ${req.body.productoNombre}`);
            }
            else {
                var d = new Date();
                let newRecibo = new Recibo({
                    productoId: req.body.productoId,
                    productoNombre: req.body.productoNombre,
                    usuarioId: req.body.usuarioId,
                    usuarioNombre: req.body.usuarioNombre,
                    fechaCompra: Date()
                });
                return newRecibo.save();
            }
        }).then(recibo => {
            console.log("made recibo");
            return res
                .header('Location', '/recibo/' + recibo._id)
                .status(201)
                .json("success");
        }).catch(err => {
            next(err);
        })
}


