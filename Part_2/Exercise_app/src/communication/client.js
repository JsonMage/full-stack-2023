import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllNumbers = () => {
    console.log('Log: Sending GET request')
    return axios
        .get(baseUrl)
        .then(response => {
            console.log('GET Response:', response.data)
            return response.data
        })
        .catch(error => console.log('Error:', error))
}

const createNewNumber = newPerson => {
    return axios
        .post(baseUrl, newPerson)
        .then(response => {
            console.log('POST Response:', response)
            return {
                message:`${newPerson.name} has been created.`,
                type: 'success'
            }
        })
        .catch(error => {
            return {
                message:`Creation of ${newPerson.name} failed.`,
                type: 'error'
            }
        })
}

const deleteNumberById = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log(`Person with ID ${id} has been deleted`, response)
            return {
                message:`Person with ID ${id} has been deleted`,
                type: 'success'
            }
        })
        .catch(error => {
            return {
                message: `Person with ID ${id} not found.`,
                type: 'error'
            }
        })
}

const updateNumber = (newPerson) => {
    return axios
        .put(`${baseUrl}/${newPerson.id}`, newPerson)
        .then(response => {
            console.log('PUT Response:', response)
            return {
                message: `${newPerson.name} has been updated.`,
                type: 'success'
            }
        })
        .catch(() => {
            return {
                message: `${newPerson.name} not found.`,
                type: 'error'
            }
        })
}



export default { getAllNumbers, createNewNumber, deleteNumberById, updateNumber }