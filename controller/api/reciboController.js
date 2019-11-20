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
