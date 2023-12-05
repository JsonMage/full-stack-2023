import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState([])

  const handleShow = (countryName) => (event) => {
    event.preventDefault()
    setSearchedCountry(countries.filter(country => country.name.official.toLowerCase().includes(countryName.toLowerCase())))
  }

  const onInput = (event) => {
    setSearchedCountry(countries.filter(country => country.name.official.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <form>
        <div>
          Find country <input onChange={onInput} />
        </div>
        <Countries countriesList={searchedCountry} handleShow={handleShow} />
      </form>
    </>
  )
}

const Countries = ({ countriesList, handleShow}) => {
  if (countriesList.length === 1) {
    const country = countriesList[0]
    console.log(country)
    return (
      <div>
        <Country country={country} />
      </div>
    )
  } else if (countriesList.length > 1 && countriesList.length <= 10) {
    return (
      <ul>
        {countriesList.map((country) => {
          return <li key={crypto.randomUUID()}>{country.name.official} <button onClick={handleShow(country.name.official)}>Show</button></li>
        })}
      </ul>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const Country = ({country}) => {
  return(
    <div>
        <h1>{country.name.official}</h1>
        <div>Capital: {country.capital[0]}</div>
        <div>Area: {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.keys(country.languages).map((key) => {
            const lang = country.languages[key]
            return <li key={crypto.randomUUID()}>{lang}</li>
          })}
        </ul>
        <img src={country.flags.png} alt="Here suppose to be a flag" width="500" height="500" />
      </div>
  )
}

export default App
