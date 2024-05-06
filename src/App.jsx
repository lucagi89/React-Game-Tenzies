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

  useEffect(() => {
    const checks = dice.every(die => {
      return die.value === dice[0].value && die.isHeld === true
    })
    if (checks) {
      setTenzies(true)
    }
  }, [dice])

  const holdDice = (id) => {
    setDice((oldDice) => {
      const newDice = oldDice.map(die => {
          return die.id === id ?
            {...die, isHeld: !die.isHeld } : die
      })
      return newDice
    })
  }

  function rollDice() {
    if (tenzies){
      setTenzies(false)
      setDice(allNewDice())
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
          <TimerHeader />
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
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
    </>
  )
}

export default App
