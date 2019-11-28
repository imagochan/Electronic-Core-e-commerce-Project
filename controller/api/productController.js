const Producto = require('../../models/Producto');
const Recibo = require('../../models/Recibo');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getOneProduct = (req,res,next) => {
    debug("Search product", req.params);
    Producto.findOne({
        nombre: req.body.nombre
    })
    .then((foundProduct) => {
        if(foundProduct)
            return res.status(200).json(foundProduct);
        else
            return res.status(400).json(error);
    })
    .catch((err)=>{
        next(err);
    })
}

module.exports.getProducts = (req,res,next) => {
/*    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";*/

    debug("Usert List",{size:perPage,page, sortby:sortProperty,sort});

    Producto.find({})
/*        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})*/
        .then((product) => {
            return res.status(200).json(product)
        }).catch(err => {
            next(err);
        })
}

module.exports.addProduct = (req,res,next) => {
    Producto.findOne({
        nombre: req.body.nombre
    })
    .then((foundProduct) => {
        if (foundProduct) {
            debug("Producto ya existe");
            throw new Error(`Producto ya existe ${req.body.nombre}`);
        } else {
            let newProducto = new Producto({
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                tiempo_entrega: req.body.tiempo_entrega,
                descripcion: req.body.descripcion,
                imagen_url: req.body.imagen_url
            });
            return newProducto.save(); // Retornamos la promesa para poder concater una sola linea de then
        }
    }).then(producto => { // Con el usario almacenado retornamos que ha sido creado con exito
        return res
            .header('Location', '/producto/' + producto._id)
            .status(201)
            .redirect('/');
    }).catch(err => {
        next(err);
    });
}

module.exports.restock = (req,res,next) => {
    debug("Restock product", {
        nombre: req.body.nombre,
    });

    let updated = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        tiempo_entrega: req.body.tiempo_entrega,
        descripcion: req.body.descripcion
    };

    Producto.findOneAndUpdate({
       nombre: req.body.nombre 
    }, update, {
        new: true
    })
    .then((updated) => {
        if(updated)
            return res.status(200).json(updated);
        else 
            return res.status(400).json(error);
    }).catch(err => {
        next(err);
    });
}

module.exports.deleteProduct = (req,res,next) => {
    //Por cuestiones de orden el parametro username y nombre estan cambiados
    console.log("username " + req.params.username);
    console.log("nombre " + req.params.nombre);
/*
    let amountRecibos=[];

    Recibo.find({
        productoNombre: req.params.username
    })
    .then((found)=> {
        amountRecibos = found;
    })

    for(let i = 0; i < amountRecibos.lenght; i++){
        Recibo.findOneAndDelete({
            productoNombre: req.params.username
        });
    }*/

    Producto.findOneAndDelete({nombre: req.params.username})
    .then((data) => {
        if(data)
            res.redirect('/');
        else
            res.status(400).json('error');
    }).catch(err => {
        next(err);
    })
}

module.exports.update = (req, res, next) => {
    debug("Update Producto", {
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        tiempo_entrega: req.body.tiempo_entrega,
        descripcion: req.body.descripcion,
        imagen_url: req.body.imagen_url
    });

    var elparams = req.params.nombre
    Producto.findOne({nombre : elparams})
        .then((miproducto) => {
            console.log(miproducto);
            res.render('actualizarproductoform', {title: 'ElectronicCore', mivariable: miproducto});
        }).catch(err => {
            next(err);
        })
}

module.exports.update2 = (req,res, next) => {
    
    let update = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        tiempo_entrega: req.body.tiempo_entrega,
        descripcion: req.body.descripcion,
        imagen_url: req.body.imagen_url
    };

    Producto.findOneAndUpdate({
            nombre: update.nombre
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                res.redirect('/')
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}