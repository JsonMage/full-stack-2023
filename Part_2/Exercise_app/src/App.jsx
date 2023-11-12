import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <PersonForm onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons personsToShow={persons} searchFilter={filter}/>
    </div>
  )
}

const Filter = ({onFilterChange}) => {
  return (
    <>
      Filter shown with <input onChange={onFilterChange} />
    </>
  )
}

const PersonForm = ({onNameChange, onNumberChange, onSubmit}) => {
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

const Persons = ({personsToShow, searchFilter}) => {
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
        {personsToShow.map(person => checkName(person.name)? <li key={crypto.randomUUID()}>{person.name}: {person.number}</li> : '')}
      </ul>
    </>
  )
}

export default App