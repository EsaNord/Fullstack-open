import { useState, useEffect } from "react"
import axios from 'axios'

import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
        })
    }, [])

    const filteredList = newFilter.length > 0 ?
        persons.filter(obj =>
            obj.name.toLowerCase().includes(newFilter)) : persons

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        } 
        const question = 'is already added to phonebook, replace with new number ?'
        
        if (!persons.some(nameObj => nameObj.name === newName)) {
            personService.create(nameObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setMessage({ text: `Added ${newName}`, type: 'notification' })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
        else if (window.confirm(`${newName} ${question}`)) {
            const id = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase()).id
            console.log('ID: ', id)
            personService.update(id, nameObject)
                .then(returnedPerson => {
                    setPersons(persons.map(person =>
                        person.id !== id ? person : returnedPerson))
                    setMessage({ text: `Changed ${newName}`, type: 'notification' })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage({
                        text: `Information of ${newName} has already been removed from server`,
                        type: 'error'
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }            

        setNewName('')
        setNewNumber('')
    }

    const personRemoval = (id) => {
        const person = persons.find(p => p.id === id)
        console.log('Person to be removed: ', person.name, 'ID: ', id)
        console.log(persons)
        console.log('Length: ', persons.length)

        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter(person => person.id !== id))
                setMessage({ text: `Removed ${person.name}`, type: 'notification' })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
                .catch(error => {
                    setMessage({
                        text: `Information of ${person.name} has already been removed from server`,
                        type: 'error'
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)

            })

        }
    }   

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFiltering = (event) => {
        setNewFilter(event.target.value)        
    }

  return (
      <div>
          <h2>Phonebook</h2>
          <Notification message={message} />
          <Filter filter={newFilter} handler={handleFiltering} />
          <h2>Add new</h2>
          <PersonForm addName={addName} name={newName} number={newNumber}
              nameHandler={handleNameChange} numberHandler={handleNumberChange} />
          <h2>Numbers</h2>
          <Persons list={filteredList} personRemoval={personRemoval} />
      </div>    
  );
}

export default App;