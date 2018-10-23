const Router = require('express').Router()
const Users = require('./model.js')

//Obtener todos los usuarios
Router.get('/all', function (req, res) {
  Users.UserModel.find({}).exec(function (err, docs) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    res.json(docs)
  })
})

//Registrar un usuario nuevo
Router.post('/new', function (req, res) {
  let user = new Users.UserModel({
    userId: Math.floor(Math.random() * 50),
    nombres: req.body.nombres,
    usuario: req.body.usuario,
    password: req.body.password,
    fNacimiento: req.body.fNacimiento,
    eventos: {}
  })
  user.save(function (error) {
    if (error) {
      res.status(500)
      res.json(error)
    }
    res.send("Registro guardado")
  })
})

//Login
Router.post('/login', function(req, res){
  let usuario = req.body.user,
      pass = req.body.pass
  Users.UserModel.find({usuario: usuario, password: pass}, function(err, docMail){
    if(err){
      res.status(500).send({message: "Error al intentar obtener el usuario. Status(500)"})
      res.json(err)
    }else{
      if(docMail.length==1){
        res.send({ message: 'Validado' })
        /*Users.find({usuario: usuario, password: pass}, function(err, docMailCon){
          if (err){
            res.status(500).send({message: "Error al intentar ingresar con el usuario especificado. Status(500)"})
          }else{
            if(docMailCon.length == 1){
              res.send({message: 'Validado'})
            }else{
              res.send({message:"Contraseña incorrecta"})
            }
          }
        })*/        
      }else{ 
        res.send({message: "El usuario no se encuentra registrado en la base de datos!!", usuario, pass, docMail})
      }
    }
    //res.send("Validado")
    //res.json(doc)
  })
})

//Obtener un usuario por su id
Router.get('/:id', function(req, res){

})

// Obtener un usuario por su id
Router.get('/', function (req, res) {
    let nombre = req.query.nombre
    Users.findOne({ nombres: nombre }).exec(function (err, doc) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})

//Obtener todos los eventos
Router.get('/allEvents', function (req, res) {
  Users.EventModel.find({}).exec(function (err, docs) {
    if (err) {
      res.status(500)
      res.json(err)
    }
    res.json(docs)
  })
})

module.exports = Router