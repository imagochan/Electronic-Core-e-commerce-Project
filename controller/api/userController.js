const User = require('../../models/Usuario');

module.exports.getId = (req, res) => {
    User.find({ username: req.params.username }, function (err, docs) {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(docs);
    });
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