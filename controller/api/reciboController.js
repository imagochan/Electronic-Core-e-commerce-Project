const Recibo = require('../../models/Recibo');
const User = require('../../models/Usuario');
const Producto = require('../../models/Producto');
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
    debug("Recibo", { body: req.body });


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
                Producto.findOne({ _id: newRecibo.productoId })
                    .then((foundProduct) => {
                        if(foundProduct.cantidad != 0){
                            foundProduct.cantidad--;
                            return newRecibo.save();
                        }else{
                            throw new Error("Producto sin existencias");
                        }
                    })
            }
        }).then(recibo => {
            console.log("made recibo");
            return 1;
//            res
//                .header('Location', '/index/ordenes/' + req.body.username)
//                .status(201)
//                .render('mainordenes', { usuario: myuser, productos: product });
//            .redirect(`/index/ordenes/${req.body.username}`);
        }).catch(err => {
            next(err);
        })
}

module.exports.getRecibosFromUsuario = async (req,res,next) => {
    var myusername = req.body.username;
    var myuser;
    await User.findOne({ username: myusername }, "-password")
        .then((foundUser) => {
            myuser = foundUser;
        })

    var myrecibosusuario;
    var productos = [];
    await Recibo.find({ usuarioId: myuser._id })
    .then((recibosUsuario) => {
        myrecibosusuario = recibosUsuario;
    })

    var cantRecibos = myrecibosusuario.length;
    var Recibos = myrecibosusuario;
    for (let i = 0; i < cantRecibos; i++) {
        await Producto.findOne({ _id: Recibos[i].productoId })
            .then((foundProduct) => {
                productos[i] = foundProduct;
            })
    }
    return res.render('indexordenes', {title: 'ElectronicCore', usuario: myuser, productos: productos})
}

module.exports.getRecibosFromMenu = async (req,res,next) => {
//    console.log(req.params.username);
    var myusername = req.params.username;
    console.log(myusername);
    var myuser;

    await User.findOne({ username: myusername }, "-password")
        .then((foundUser) => {
            console.log(foundUser);
            myuser = foundUser;
        })
    console.log("hola mundo");
    console.log(myuser);
    console.log("hola mundo2");

    var myrecibosusuario;
    var productos = [];
    await Recibo.find({ usuarioId: myuser._id })
    .then((recibosUsuario) => {
        console.log("despues de recibofindawait");
        myrecibosusuario = recibosUsuario;
    })
    console.log(myrecibosusuario.length);
    var cantRecibos = myrecibosusuario.length;
    var Recibos = myrecibosusuario;
    for (let i = 0; i < cantRecibos; i++) {
        await Producto.findOne({ _id: Recibos[i].productoId })
            .then((foundProduct) => {
                productos[i] = foundProduct;
                console.log("Producto");
            })
    }
    return res.render('indexordenes', {title: 'ElectronicCore', usuario: myuser, productos: productos})
}

