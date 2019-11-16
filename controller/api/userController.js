const User = require('../../models/Usuario');
var debug = require('debug')('proyectoWeb:user_controller');

module.exports.getone = (req,res,next) => {
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



module.exports.create = (req, res) => {
    let insertUser = new User({
        username: req.body.username,
        password: req.body.password,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        numero_tarjeta_credito: req.body.numero_tarjeta_credito
    });

    insertUser.save().then((newUser) => { res.status(200).json(insertUser) }).catch((err) => { res.status(500).json(err); })

}