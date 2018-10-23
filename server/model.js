const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  userId: { type: Number, require: true, unique: true },
  nombres: { type: String, require: true },
  usuario: { type: String, require: true },
  password: { type: String, require: true },
  fNacimiento: {type: Date, require:true},
  eventos: {type: Object, require: false}
})

let EventSchema = new Schema({
  eventId: { type: Number, require: true, unique: true},
  evento: {type: String, require: true},
  titulo: { type: String, require: true },
  fechaInicio: { type: Date, require: true },
  horaInicio: { type: Date, require: false },
  fechaFin: { type: Date, require: false },
  horaFin: { type: Date, require: false },
  fullday: { type: Boolean, require: true}
})

let UserModel = mongoose.model('Usuarios', UserSchema)
let EventModel = mongoose.model('Eventos', EventSchema)

module.exports = {UserModel, EventModel}




