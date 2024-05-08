import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import Confettino from './components/Confettino'
import TimerHeader from './components/TimerHeader'
import {nanoid} from 'nanoid'


function App() {

  const generateNewDie = () => {
    const num = Math.floor(Math.random() * 6) + 1
    return { id: nanoid(), value: num, isHeld: false }
  }

  const allNewDice = () => {
    const dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie())
    }
    return dice
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [timeRecord, setTimeRecord] = useState(() => {
    const savedRecord = localStorage.getItem('time-record')
    return savedRecord ? JSON.parse(savedRecord) : 0
  })
  const [time, setTime] = useState(0)

  const [isGameStarted, setIsGameStarted] = useState(false)


  useEffect(() => {
    // if (isGameStarted) {
      const intervalId = setInterval(() => {
        console.log("Game")
        setTime((oldTime) => oldTime + 1)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    // }
  }, [tenzies])


  // every time there is a change in the dice array, check if the game is over
  useEffect(() => {
    const checks = dice.every(die => {
      return die.value === dice[0].value && die.isHeld === true
    })
    if (checks) {
      setTenzies(true)
      setIsGameStarted(false)
    }
  }, [dice])

  // hold the dice that with the same value that have been clicked
  const holdDice = (id) => {
    setDice((oldDice) => {
      const newDice = oldDice.map(die => {
          return die.id === id ?
            {...die, isHeld: !die.isHeld } : die
      })
      return newDice
    })
  }

  const checkTimeRecord = () => {
    if (time < timeRecord || timeRecord === 0) {
      setTimeRecord(time)
      localStorage.setItem('time-record', JSON.stringify(time))
    }
  }

  function rollDice() {
    if (tenzies){
      checkTimeRecord()
      setTenzies(false)
      setDice(allNewDice())
      setIsGameStarted(true)
    }else{
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ?
            die : generateNewDie()
        })
      })
    }

  }

  const diceComponents = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <>
      <main>
        <div className="game">
          <TimerHeader
          record={timeRecord}
          time={time < 10 ? `0${time}` : time}
          />
          {tenzies && <Confettino />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
          Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dice-container">
            {diceComponents}
          </div>

          <button className="roll-btn" onClick={rollDice}>
            {tenzies ? "Start Game" : "Roll"}
          </button>
        </div>
      </main>
    </>
  )
}

export default App
