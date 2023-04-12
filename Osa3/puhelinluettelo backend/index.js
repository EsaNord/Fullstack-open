const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => { return JSON.stringify(req.body) })

app.use(morgan
    (':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: 'Arto Hellas',
        number: '040123456',
        id: 1
    },
    {
        name: 'Henri Tavas',
        number: '03124598',
        id: 2
    },
    {
        name: 'Jani Metsä',
        number: '050457836',
        id: 3
    },
    {
        name: 'Marja Alitalo',
        number: '041523879',
        id: 4
    },
    {
        name: 'Orvokki Ylitalo',
        number: '040512384',
        id: 5
    },
    {
        name: 'Tiina Ojanen',
        number: '050457631',
        id: 6
    },
    {
        name: 'Arto Mäki',
        number: '050197563',
        id: 7
    },
    {
        name: 'Topi Kannas',
        number: '041789852',
        id: 8
    },
    {
        name: 'Tapani Joki',
        number: '050178954',
        id: 9
    }
]

app.get('/info', (req, res) => {
    const date = new Date()
    const entries = persons.length
    res.send(`<p>Phonebook has info of ${entries} people</p>
    <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log('Removing person from phonebook')
    console.log(`Person with id: ${id} has been removed`)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log('Recieved POST message')

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing!'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100)
    }
    console.log('Checking...')
    if (persons.some(obj => obj.name === person.name)) {
        return res.status(400).json({
            error: 'Name must be unique!'
        })
    }
    console.log('Adding person to phonebook')
    console.log(`Person: ${person.name}, ID: ${person.id}`)

    persons = persons.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})