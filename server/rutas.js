const Router = require('express').Router()
const Users = require('./model.js')

//Obtener todos los usuarios
Router.get('/all', function (req, res) {
  Users.find({}).exec(function (err, docs) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    res.json(docs)
  })
})

//registrar un usuario nuevo
Router.get('/new', function(req, reg){

})

//Obtener un usuario por su id
Router.get('/:id', function(req, req){

})

// Obtener un usuario por su id
Router.get('/', function (req, res) {
    /*let nombre = req.query.nombre
    Users.findOne({ nombres: nombre }).exec(function (err, doc) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })*/
})

module.exports = Router