const User = require('../../models/Usuario');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getOne = (req,res,next) => {
    debug("Search User", req.params);
    User.findOne({
        username: req.params.username
    }, "-password -login_count")
    .then((foundUser)=> {
        if(foundUser)
            return res.status(200).json(foundUser);
        else 
            return res.status(400).json(null);
    })
    .catch(err=>{
        next(err);
    })
}

module.exports.getAll = (req,res,next) => {

    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;
    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("User List", {size: perPage, page, sortby:sortProperty,sort});

    User.find({}, "-password -login_count")
        .limit(perPage)
        .skip(perPage*page)
        .sort({ [sortProperty]: sort})
        .then((users) => {
            return res.status(200).json(users);
        }).catch(err=>{
            next(err);
        })
}

module.exports.register = (req,res,next) => {
    debug("User", {body : req.body});
    User.findOne({
        username : req.body.username
    }, "-password -login_count")
    .then((foundUser) => {
        if(foundUser){
            debug("Ususario duplicado");
            throw new Error(`Usuario duplicado ${req.body.username}`);
        }
        else{
            let newUser = new User({
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                numero_tarjeta_credito: req.body.numero_tarjeta_credito
            });
            return newUser.save();
        }
    }).then(user => {
        return res
                .header('Location', '/users/' + user.id)
                .status(201)
                .json({
                    _id : user._id
                });

    }).catch(err =>{
        next(err);
    })
}
