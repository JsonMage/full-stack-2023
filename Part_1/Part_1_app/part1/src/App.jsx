const App = () => {
  const now = new Date()
  const name = "Peter"
  const age = 10
  console.log(now)
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={age} />
      <p>Hello world, it is {now.toString()}</p>
    </>
  )
}

const Hello = (props) => {
  console.log(props)
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </>
  )
}

export default App
