var User = require('./model.js');

module.exports.insertarRegistro = function (callback) {

    let Mateo = new User({ nombre: "Diego", edad: 48, peso: 70, genero: 'Hombre' })

    Mateo.save((error) => {
        if (error) callback(error)
        callback(null, "Registro guardado satisfactoriamente.")
    })

}


module.exports.eliminarRegistro = function (callback) {
    User.remove({ edad: 40 }, (error) => {
        if (error) callback(error)
        callback(null, "Se elimino correctamente el registro")
    })
}

module.exports.consultarYActualizar = function (callback) {
    User.find({}).exec((error, result) => {
        if (error) callback(error)
        console.log(result)
        User.update({ nombre: "Mateo" }, { peso: 40 }, (error, result) => {
            if (error) callback(error)
            callback(null, result)
        })
    })
}

module.exports.ordenarConsulta = function (callback) {
    User.find({}).sort({ edad: -1 }).exec((error, result) => {
        if (error) callback(error)
        callback(null, result)
    })
}