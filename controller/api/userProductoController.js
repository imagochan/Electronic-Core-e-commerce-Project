const User = require('../../models/Usuario');
const Producto = require('../../models/Producto');
var debug = require('debug')('proyectoWeb:user_product_controller');

module.exports.LoadIndex = async (req,res,next) => {
    var usuarioLogged;
    var productos = [];
    await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    .then((foundUser)=>{
        if(foundUser){
            usuarioLogged = foundUser;
        }
        else
            res.redirect('/');
    });

    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Usert List",{size:perPage,page, sortby:sortProperty,sort});

    await Producto.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((product) => {
            res.render('index', {title: 'Index', usuario: usuarioLogged, productos: product});
//           return res.status(200).json(product)
        }).catch(err => {
            next(err);
        })
}

module.exports.Comprar = async (req,res,next) => {
    var userLogged;
    
    await User.findOne({
        username: req.params.username,
    })
    .then((foundUser)=>{
        if(foundUser){
            userLogged = foundUser;
        }
        else
            res.redirect('/');
    });

    await Producto.findOne({
        nombre: req.params.nombre
    })
    .then((product)=>{
        res.render('product', {title: 'Index', usuario: userLogged, productos: product});
    });


}

