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
    const parsedRecord = savedRecord ? JSON.parse(savedRecord) : 0
    return parsedRecord
  })
  const [gameData, setGameData] = useState({
    rolls: 1,
    seconds: 0
  })




useEffect(() => {
  let seconds = 0
    if (tenzies === false) {
      setInterval(() => {
        seconds++
        setGameData((oldData) => {
          return { ...oldData, seconds: seconds }
        })
      }, 1000)
    } else {
      // Clear the timer if the game is not started
      clearInterval()
      setGameData((oldData) => {
        return { ...oldData, seconds: seconds }
      })
    }
  }, [tenzies])



  // every time there is a change in the dice array, check if the game is over
  useEffect(() => {
    const checks = dice.every(die => {
      return die.value === dice[0].value && die.isHeld === true
    })
    if (checks) {
      setTenzies(true)
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
    if (gameData.seconds < timeRecord || timeRecord === 0) {
      setTimeRecord(gameData.seconds)
      localStorage.setItem('time-record', JSON.stringify(gameData.seconds))
    }
  }

  function rollDice() {
    if (tenzies){
      checkTimeRecord()
      setTenzies(false)
      setDice(allNewDice())
      // setGameData({rolls: 1, seconds: 0})
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
          time={gameData.seconds < 10 ? `0${gameData.seconds}` : gameData.seconds}
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
