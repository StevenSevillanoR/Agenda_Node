const mongoose = require('mongoose')

const Schema = mongoose.Schema

let EventSchema = new Schema({
    usuarioId: { type: Schema.ObjectId, ref: 'Usuarios' },
    usuario: {type: String, ref: 'Usuarios'},
    title: { type: String, require: true },
    start: { type: String, require: true },
    start_hour: { type: String, require: false },
    end: { type: String, require: false },
    end_hour: { type: String, require: false },
    fullday: { type: Boolean, require: true }
})

let EventModel = mongoose.model('Evento', EventSchema)

module.exports = EventModel