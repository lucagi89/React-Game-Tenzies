import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'


function App() {
  const allNewDice = () => {
    const dice = []
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * 6) + 1
      dice.push({ id: nanoid(), value: num, isHeld: true })
    }
    return dice
  }

  const holdDice = (id) => {
    console.log(id)
  }


  const [dice, setDice] = useState(allNewDice())
  const diceComponents = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={holdDice}
      id={die.id}/>
  ))

  return (
    <>
      <main>
        <div className="game">
          <div className="dice-container">
            {diceComponents}
          </div>
          <button className="roll-btn" onClick={() => setDice(allNewDice())}>
            Roll
          </button>
        </div>
      </main>
    </>
  )
}

export default App
