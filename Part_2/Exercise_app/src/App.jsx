import { useState, useEffect } from 'react'
import client from './communication/client'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    client.getAllNumbers().then(initialData => {
      setPersons(initialData)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      if (window.confirm(`${newName} already exists. Do you want to overwrite it?`)) {
        const currentPerson = persons.find(person => person.name === newName)
        const newPerson = {
          name: newName,
          number: newNumber,
          id: currentPerson.id
        }
        const updatedPersons = persons.filter(person => person.name != newName)

        setPersons(updatedPersons.concat(newPerson))
        client.updateNumber(newPerson)
          .then((response) => {
            setNotification(response)
            setTimeout(() => {
              setNotification({})
            }, 5000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: crypto.randomUUID()
      }
      setPersons(persons.concat(newPerson))
      console.log('Sending submitted data to the server')
      client.createNewNumber(newPerson)
        .then((response) => {
          setNotification(response)
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
    }
  }

  const handleDelete = (event) => {
    if (window.confirm('Are you sure you want to delete selected number?')) {
      const personId = event.target.id
      client.deleteNumberById(personId)
        .then((response) => {
          setNotification(response)
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
      setPersons(persons.filter((person) => person.id != personId))
    }
  }

  return (
    <div>
      <Notifictaion message={notification.message} type={notification.type} />
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <PersonForm onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons onDelete={handleDelete} personsToShow={persons} searchFilter={filter} />
    </div>
  )
}

const Filter = ({ onFilterChange }) => {
  return (
    <>
      Filter shown with <input onChange={onFilterChange} />
    </>
  )
}

const PersonForm = ({ onNameChange, onNumberChange, onSubmit }) => {
  return (
    <>
      <form>
        <div>
          name: <input onChange={onNameChange} />
        </div>
        <div>
          number: <input onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ personsToShow, searchFilter, onDelete }) => {
  const checkName = (name) => {
    if (searchFilter.length > 0) {
      return name.toLowerCase().includes(searchFilter.toLowerCase())
    } else {
      return true
    }
  }

  return (
    <>
      <ul>
        {personsToShow.map(person => checkName(person.name) ?
          <li key={person.id}>{person.name}: {person.number} <DeleteButton personId={person.id} handleDelete={onDelete} /></li> : '')}
      </ul>
    </>
  )
}

const DeleteButton = ({ personId, handleDelete }) => {
  return (
    <>
      <button id={personId} type='button' onClick={handleDelete}>Delete</button>
    </>
  )
}

const Notifictaion = ({ message, type }) => {
  if (!message) {
    return null
  }

  let notificationStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: 24,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: 'green',
    paddingLeft: 10,
    paddingRight: 10
  }

  if (type === 'error') {
    notificationStyle.borderColor = 'red'
    notificationStyle.color = 'red'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default App