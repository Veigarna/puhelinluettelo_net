const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mongoveigar:${password}@phonebookcluster.fw06zfb.mongodb.net/?retryWrites=true&w=majority&appName=phoneBookCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  Name: String,
  Number: String,
  Id: Number,
})

const Person = mongoose.model('Person', personSchema)

console.log('Test', process.argv.length)

if (process.argv.length === 5) {
  console.log('Salasana', process.argv[2])
  console.log('Name', process.argv[3])
  console.log('Number', process.argv[4])

  const person = new Person({
    Name: process.argv[3],
    Number: process.argv[4],
  })

  person.save().then((result) => {
    console.log(
      `Added ${process.argv[3]} number: ${process.argv[4]} to phonebook!`
    )
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  console.log('Listaus puhelinluettelosta')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.Name + ' ' + person.Number)
    })
    mongoose.connection.close()
  })
}
