const Recibo = require('../../models/Recibo');
const User = require('../../models/Usuario');
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

module.exports.makeRecibo = async (req, res, next) => {
    console.log("user: " + req.body.username);
    debug("Recibo", { body: req.body });

    var myusername = req.body.username;
    var myuser;
    await User.findOne({"username":myusername}).then((foundUser) => {
        console.log(foundUser._id)
        myuser = foundUser;
    })
    console.log("hola mundo");
    console.log(myuser._id);
    console.log("hola mundo2");

    var myrecibosusuario;
    var productos;

    await Recibo.find({"UsuarioId":myuser._id}).then((recibosUsuario) => {
        console.log(recibosUsuario._id);
        console.log("despues de recibofindawait");
        myrecibosusuario = recibosUsuario;
    })
    
    console.log(myrecibosusuario.countDocuments);

    for(let i = 0; myrecibosusuario.countDocuments; i++){
        await Producto.findOne({"_id":reciboUsuario[i].ProductoId}).then((foundProduct) => {
            console.log(foundProduct[i].nombre);
        })
    }

    await Recibo.findOne({
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
                    productoNombre: req.body.nombre,
                    usuarioId: req.body.usuarioId,
                    usuarioNombre: req.body.username,
                    fechaCompra: Date()
                });
                return newRecibo.save();
            }
        }).then(recibo => {
            console.log("made recibo");

            return res
                .header('Location', '/index/ordenes' + req.body.username)
                .status(201)
                .render('mainordenes', {usuario: myuser, productos: product});
            //res.redirect(`/index/ordenes/${req.body.username}`);
        }).catch(err => {
            next(err);
        })
}