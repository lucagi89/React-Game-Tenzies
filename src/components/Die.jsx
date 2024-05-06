
import PropTypes from 'prop-types'
// import './Die.css'

function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
  }
  return (
    <div className= "die" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  )
}

Die.propTypes = {
  value: PropTypes.number.isRequired,
  isHeld: PropTypes.bool.isRequired,
  holdDice: PropTypes.func.isRequired
}

export default Die
