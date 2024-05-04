// import { useState } from 'react'
import PropTypes from 'prop-types'
import './Die.css'

function Die(props) {
  // const [value, setValue] = useState(1)
  return (
    <div className="die">
      {props.value}
    </div>
  )
}

Die.propTypes = {
  value: PropTypes.number.isRequired
}

export default Die
