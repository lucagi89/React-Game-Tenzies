import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
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
  const [ tenzies, setTenzies] = useState(false)

  useEffect(() => {
    console.log("state changed")
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
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.isHeld ?
          die : generateNewDie()
      })
    })
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
          <div className="dice-container">
            {diceComponents}
          </div>
          <button className="roll-btn" onClick={rollDice}>
            Roll
          </button>
        </div>
      </main>
    </>
  )
}

export default App
