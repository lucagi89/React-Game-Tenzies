

function TimerHeader() {
  return (
    <div className= "timer-container">
      <div className="time-tracker">
        <h3>Your Time</h3>
        <div className="timer">
          <h4>00:00</h4>
        </div>
      </div>
      <div className="time-tracker">
          <h3>Record</h3>
        <div className="timer best-time">
          <h4>00:00</h4>
        </div>
      </div>
    </div>
  )
}


export default TimerHeader
