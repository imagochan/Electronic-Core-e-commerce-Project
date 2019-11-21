const Recibo = require('../../models/Recibo');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getOne = (req,res,next) => {
    debug("Search recibo", req.params);
    Recibo.findOne({
        productoId: req.body.productoId,
        usuarioId: req.body.usuarioId
    })
    .then((foundRecibo) => {
        if(foundRecibo)
            return res.status(200).json(foundRecibo);
        else
            return res.status(400).json(error);
    })
    .catch((err)=>{
        next(err);
    })
}

module.exports.makeRecibo = (req,res,next) => {
    debug("Recibo", {body: req.body});
    Recibo.findOne({
        _id: req.body._id
    })
    .then((foundRecibo) => {
        if(foundRecibo){
            debug("Recibo ya existente");
            throw new Error(`Recibo ya existente ${req.body.usuarioNombre} ${req.body.productoNombre}`);
        }
        else{
            let newRecibo = new Recibo({
                productoId: req.body.productoId,
                productoNombre: req.body.productoNombre,
                usuarioId: req.body.usuarioId,
                usuarioNombre: req.usuarioNombre,
                fechaCompra: req.body.fechaCompra
            });
            return newRecibo.save();
        }
    }).then(recibo => {
        return res
                .header('Location', '/recibo/' + recibo._id)
                .status(201);
    }).catch(err => {
        next(err);
    })
}


