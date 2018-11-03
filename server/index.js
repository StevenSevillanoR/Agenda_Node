const http = require('http'),
      path = require('path'),
      RutasUsuarios = require('./rutas_usuarios.js'),
      RutasEventos = require('./rutas_eventos.js'),  
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session')

const PORT = 8082
const app = express()

const Server = http.createServer(app)

mongoose.connect('mongodb://localhost/agendaBD')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('client'))

//Handler de Sesiones
app.use(session({
  secret: 'Eventos_Sevillano',
  cookie: { maxAge: 100000000 },
  resave: false,
  saveUninitialized: true
}))

app.use('/users', RutasUsuarios)
app.use('/event', RutasEventos)

Server.listen(PORT, function(){
  console.log("Server in listening on port: "+PORT);
})