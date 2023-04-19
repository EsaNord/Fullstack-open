const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('ERROR: Give password as argument!')
    process.exit(1);
}

const password = process.argv[2]
const url =
    `mongodb+srv://esanord:${password}@fullstackproject0.q1nkfqh.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 5) {
    console.log('ERROR: if name or number contains spaces you must add "" around it!')
    process.exit(1);
}
else if (process.argv.length === 5) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}