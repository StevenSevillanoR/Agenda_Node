const Router = require('express').Router()
const Users = require('./model_users.js')

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

//Registrar un usuario nuevo
Router.post('/new', function (req, res) {
  let user = new Users({
    userId: Math.floor(Math.random() * 50),
    nombres: req.body.nombres,
    usuario: req.body.usuario,
    password: req.body.password,
    fNacimiento: req.body.fNacimiento
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
      session = req.session
  Users.find({usuario: usuario, password: pass}, function(err, docMail){
    if(err){
      res.status(500).send({message: "Error al intentar obtener el usuario. Status(500)"})
      res.json(err)
    }else{
      if(docMail.length==1){
        session.usuario = docMail[0]['usuario']
        session.user_id = docMail[0]['_id']
        res.send({ message: 'Validado' , session: session.usuario})        
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
            res.status(500).send(json(err))
            //res.json(err)
        }
        res.json(doc)
    })
})

/*Router.get('/obtener_eventos', function (req, res) {
  req.session.reload(function (err) {
    //Control de sesión
    if (err) {
      res.send('logout')
      res.end()
    } else {
      sesionDeUsuario = req.session.id_usuario
      Evento.find({ id_usuario: sesionDeUsuario }, (err, eventos) => {
        if (err) {
          return res.status(500).send({ message: 'Error al intentar obtener los eventos. (status:500)' })
        } else {
          if (!eventos) {
            return res.status(404).send({ message: 'No exiten eventos en la base de datos. (status:404)' })
          } else {
            res.json(eventos)
          }
        }
      })
    }
  })
})*/

//Metodo cerrar sesión
Router.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).send({ message: 'Error al intentar cerrar la sesión'})
    } else {
      req.session = null
      res.send('logout').end()
    }
  })
})  

Router.all('/', function (req, res) {
  return res.send({ message: 'Error al intentar mostrar el recurso solicitado.' }).end()
})

module.exports = Router