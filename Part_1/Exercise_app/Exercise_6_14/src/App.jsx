import { useState } from 'react'

function App() {
  const [feedback, setFeedback] = useState([0, 0, 0])

  const changeState = (value) => {
    const newFeedback = [...feedback]
    switch (value) {
      case 'Good':
        newFeedback[0] += 1
        break
      case 'Neutral':
        newFeedback[1] += 1
        break
      case 'Bad':
        newFeedback[2] += 1
        break
    }
    setFeedback(newFeedback)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  
  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8))
  }

  const [points, setPoints] = useState(Array(8).fill(0))

  const handleVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <p>Thank you for using our services. Please leave your feedback and let us improve!</p>
      <Button text="Good" handleClick={() => changeState("Good")} />
      <Button text="Neutral" handleClick={() => changeState("Neutral")} />
      <Button text="Bad" handleClick={() => changeState("Bad")} />
      <h1>Statistics</h1>
      <Statistics stats={feedback} />
      <Button text="vote" handleClick={handleVote} />
      <Button text="Next anecdote" handleClick={randomAnecdote} />
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[points.indexOf(Math.max(...points))]}
        <h1>Anecdote with most votes</h1>
        {anecdotes[selected]}
        <p>has {points[selected]} points</p>
      </div>
    </div>
  )
}

function Button({ text, handleClick }) {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function Statistics({ stats }) {
  const total = stats[0] + stats[1] + stats[2]
  const avg = (stats[0] - stats[2]) / total
  const positivePercentage = (stats[0] / total) * 100
  if (stats[0] == 0 && stats[1] == 0 && stats[2] == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"Good"} value={stats[0]} />
        <StatisticLine text={"Neutral"} value={stats[1]} />
        <StatisticLine text={"Bad"} value={stats[2]} />
        <StatisticLine text={"All"} value={total} />
        <StatisticLine text={"Average"} value={avg} />
        <StatisticLine text={"Positive"} value={positivePercentage} percent="%" />
      </tbody>
    </table>
  )
}

function StatisticLine({ text, value, percent }) {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value} {percent}</td>
    </tr>
  )
}

export default App
