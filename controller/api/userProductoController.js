const User = require('../../models/Usuario');
const Producto = require('../../models/Producto');
const Recibo = require('../../models/Recibo');
const Admin = require('../../models/Admin');
var debug = require('debug')('proyectoWeb:user_product_controller');

module.exports.LoadIndex = async (req,res,next) => {
    var usuarioLogged = "";
    var admin = false;
    var productos = [];
    await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    .then((foundUser)=>{
        if(foundUser){
            usuarioLogged = foundUser;
        }
        else{
            Admin.findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then((foundAdmin) => {
                if(foundAdmin != undefined){
                    usuarioLogged = foundAdmin;
                    admin = true;
                }else{
                    res.redirect('/');
                }
            })
        }
    });

    await Producto.find({})
/*        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})*/
        .then((product) => {
                res.render('index', {title: 'ElectronicCore', usuario: usuarioLogged, productos: product, admin: admin});
//           return res.status(200).json(product)
        }).catch(err => {
            next(err);
        })
}

module.exports.Comprar = async (req,res,next) => {
    var userLogged;
    var admin =  false;
    await User.findOne({
        username: req.params.username,
    })
    .then((foundUser)=>{
        if(foundUser){
            userLogged = foundUser;
        }
        else{
            Admin.findOne({
                username: req.params.username
            })
            .then((foundAdmin) => {
                if(foundAdmin){
                    userLogged = foundAdmin;
                    admin = true;
                }else{
                    res.redirect('/');
                }
            })
        }
    });

    await Producto.findOne({
        nombre: req.params.nombre
    })
    .then((product)=>{
        res.render('product', {title: 'ElectronicCore', usuario: userLogged, producto: product, admin: admin});
    });


}

module.exports.LoadIndexRecibo = async (req,res,next) => {
    console.log("hola soy yo");
    var myusername = req.params.username
    var myUsuario;

    User.findOne({"username":myusername}).then((miUsuario) => {
        myUsuario = miUsuario;
    })

    var usuarioLogged;
    var productos = [];
    await User.findOne({
        username: myUsuario.username,
        password: myUsuario.password
    })
    .then((foundUser)=>{
        if(foundUser){
            usuarioLogged = foundUser;
        }
        else
            res.redirect('/');
            console.log("fallo login")
    });

    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List",{size:perPage,page, sortby:sortProperty,sort});

    var misProductos;

    Recibo.find({"UsuarioId":usuarioLogged._id }).then((recibosUsuario) => {
        
        for(let i = 0; recibosUsuario.length(); i++){
            misProductos[i] = Producto.findOne({"_id":reciboUsuario[i].ProductoId})
        }
    }).then((Recibos) => {
        res.render('mainordenes', {usuario: usuarioLogged, productos: misProductos});
    }).catch(err => {
        next(err);
    })


/*
    await Producto.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((product) => {
            res.render('index', {title: 'Index', usuario: usuarioLogged, productos: product});
//           return res.status(200).json(product)
        }).catch(err => {
            next(err);
        })*/
}
