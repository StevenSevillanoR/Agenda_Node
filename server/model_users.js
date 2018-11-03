const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  nombres: { type: String, require: true },
  usuario: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, require: true, lowercase: true },
  fNacimiento: {type: Date, require:true}
})

let UserModel = mongoose.model('Usuarios', UserSchema)


module.exports = UserModel




