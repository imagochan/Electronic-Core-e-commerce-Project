const Product = require('../../models/Producto');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getOneProduct = (req,res,next) => {
    debug("Search product", req.params);
    Product.findOne({
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
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List",{size:perPage,page, sortby:sortProperty,sort});

    Product.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((product) => {
           return res.status(200).json(product)
        }).catch(err => {
            next(err);
        })
}

module.exports.addProduct = (req,res,next) => {
    Product.findOne({
        nombre: req.body.nombre
    })
    .then((foundProduct) => {
        if (foundProduct) {
            debug("Producto ya existe");
            throw new Error(`Producto ya existe ${req.body.nombre}`);
        } else {
            let newProduct = new Product({
                nombre: req.body.nombre,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                tiempo_entrega: req.body.tiempo_entrega,
                descripcion: req.body.descripcion
            });
            return newProduct.save(); // Retornamos la promesa para poder concater una sola linea de then
        }
    }).then(producto => { // Con el usario almacenado retornamos que ha sido creado con exito
        return res
            .header('Location', '/producto/' + producto._id)
            .status(201)
            .json({
                nombre: producto.nombre
            });
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

    Product.findOneAndUpdate({
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
    Product.findOneAndDelete({nombre: req.body.nombre})
    .then((data) => {
        if(data)
            res.status(200).json(data);
        else
            res.status(400).json(error);
    }).catch(err => {
        next(err);
    })
}
