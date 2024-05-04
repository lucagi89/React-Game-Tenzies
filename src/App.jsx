import { useState } from 'react'
import './App.css'
import Die from './components/Die'

const allNewDice = () => {
  const dice = []
  for (let i = 0; i < 10; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1)
  }
  return dice
}

function App() {

  const [dice, setDice] = useState(allNewDice())
  const diceComponents = dice.map((value, index) => (
    <Die key={index} value={value} />
  ))

  return (
    <>
      <main>
        <div className="game">
          <div className="dice-container">
            {diceComponents}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
