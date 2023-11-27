import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllNumbers = () => {
    console.log('Log: Sending GET request')
    const response = axios
        .get(baseUrl)
        .then(response => {
            console.log('GET Response:', response.data)
            return response.data
        })
        .catch(error => console.log('Error:', error))
    return response
}

const createNewNumber = newPerson => {
    const response = axios
        .post(baseUrl, newPerson)
        .then(response => {
          console.log('POST Response:', response)
        })
        .catch(error => console.log('Error:', error))
}

const deleteNumberById = id => {
    const response = axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(`Person with ID ${id} has been deleted`, response)
        })
        .catch(error => console.error('Delete operation has failed...', error))
}

const updateNumber = (newPerson) => {
    const response = axios
        .put(`${baseUrl}/${newPerson.id}`, newPerson)
        .then(response => {
          console.log('PUT Response:', response)
        })
        .catch(error => console.log('Error:', error))
}

export default { getAllNumbers, createNewNumber, deleteNumberById, updateNumber }