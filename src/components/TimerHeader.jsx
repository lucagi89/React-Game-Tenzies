// import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function TimerHeader(props) {

  return (
    <div className= "timer-container">
      <div className="time-tracker">
        <h3>Your Time</h3>
        <div className="timer">
          <h4>{props.time}</h4>
        </div>
      </div>
      <div className="time-tracker">
          <h3>Record</h3>
        <div className="timer best-time">
          <h4>{props.record === 0? "None": props.record }</h4>
        </div>
      </div>
    </div>
  )
}

TimerHeader.propTypes = {
  record: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
}


export default TimerHeader
