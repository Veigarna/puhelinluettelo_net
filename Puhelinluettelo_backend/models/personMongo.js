const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

//yhdistys

console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//muodon määrittely
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: String,
})

//id korjaus string muotoon
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
