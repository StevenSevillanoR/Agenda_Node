const Router = require('express').Router()
const Events = require('./model_events.js')

//Obtener todos los eventos
Router.get('/allEvents', function (req, res) {
  let nomEvento = req.body.evento
  let session = req.session.usuario
  if(session == null || !session){
    res.status(200).send({message: "No hay ninguna sesión iniciada. Por favor inicie sesión.", session: "Error"})
  }else{
    Events.find({usuario: session}, function (err, docs) {
      if (err) {
        res.status(500).send("Error al conectar con el servidor. Status(500)")
        //res.json(err, doc)
      } else {
        if (!docs || docs == null || docs.length == 0) {
          let document = { message: "No hay eventos para mostrar", doc: docs, session: session }
          res.status(200).send(document)
          //res.json(null)
        } else {
          let document = { message: "Tengo todos los eventos", doc: docs, session: session}
          res.status(200).send(document)
        }
      }
    })
  }
})

//Metodo insertar nuevo Evento de sistema 
Router.post('/addEvent', function (req, res) {
      if (req.body.allDay == 0 || req.body.allDay == '0'){
        let fullday = false
      }else{
        let fullday = true
      }

      let newEvent = new Events({
        usuarioId: req.session.user_id,
        usuario: req.session.usuario,
        title: req.body.title,
        start: req.body.start,
        start_hour: req.body.start_hour,
        end: req.body.end,        
        end_hour: req.body.end_hour,
        fullday: req.body.fullday
      })

      //res.send({message:"funciono", evento: newEvent})

      newEvent.save((err) => {
        if (err && err.code != 11000) {
          return res.status(500).send({message: 'Error al intentar insertar el evento. (status:500)' , evento: newEvent})
        } else {
          return res.status(200).send({ message: 'El evento ha sido insertado correctamente', evento: newEvent })
        }
      })
})

//Eliminar un evento 
Router.post('/delete/', function(req, res){
  let eventoId = req.body.id;
  
  //res.send({message:"OK", eventoID: eventoId, doc: req.body})
  
  Events.findById(eventoId, (err, evento) => {
    if (err) {
      return res.status(500).send({ message: 'Error al intentar hallar el evento.' })
    } else {
      evento.remove(err => {
        if (err) {
          return res.status(500).send({ message: 'Error al intentar eliminar el evento.', error: err })
        } else {
          res.send({message:'El evento ha sido eliminado correctamente', evento: evento})
        }
      })
    }
  })
})

//Actualizar Eventos
Router.post('/update/', function(req, res){

  let eventoId = req.body._id,
      start_hour = req.body.start_hour,
      end_hour = req.body.end_hour,
      start = '',
      end = ''

  if(start_hour == null || start_hour == ""){
    start = req.body.start
  }else{
    start = req.body.start+'T'+start_hour+'Z'
  }

  if (end_hour == null || end_hour == "") {
    end = req.body.end
  } else {
    end = req.body.end + 'T' + end_hour + 'Z'
  }
  
  Events.findById(eventoId, (err, evento) =>{
    if(err){
      return res.status(500).send({ message: 'Error al intentar encontrar el evento.' })
    }else{
      Events.update({ _id: eventoId }, {
        start: start,
        end: end
      }, (err) => {
        if (err) {
          return res.status(500).send({ message: 'Error al intentar actualizar el evento.' })
        } else {
          res.status(200).send({message:'El evento ha sido actualizado exitosamente', evento: evento, doc: {start, end, eventoId}})
        }
      })
    }
    //res.send({ message: "OK", doc: req.body })
  })
})

module.exports = Router