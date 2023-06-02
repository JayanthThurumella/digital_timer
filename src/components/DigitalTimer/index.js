import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {mintues: 25, seconds: '00', started: false, reset: 25}

  setTimeLimitIncrese = () => {
    const {started} = this.state
    if (!started) {
      this.setState(prevTime => ({
        reset: prevTime.reset + 1,
        mintues: prevTime.reset + 1,
        seconds: '00',
        started: false,
      }))
    }
  }

  setTimeLimitDecrease = () => {
    const {started} = this.state
    if (!started) {
      this.setState(prevTime => ({
        reset: prevTime.reset - 1,
        mintues: prevTime.reset - 1,
        seconds: '00',
        started: false,
      }))
    }
  }

  timerStart = () => {
    const {mintues, seconds} = this.state
    let sec = 60
    let time = mintues
    if (seconds !== '00') {
      sec = seconds
    } else {
      time = mintues - 1
    }

    this.timerID = setInterval(() => {
      if (sec === 1 && time !== 0) {
        sec = 60
        time -= 1
        this.setState({
          mintues: time,
          seconds: '00',
          started: false,
        })
      } else if (time === 0 && sec === 1) {
        clearInterval(this.timerID)
        this.setState({mintues: '00', seconds: '00', started: false})
      } else {
        sec -= 1
        this.setState({mintues: time, seconds: sec, started: true})
      }
    }, 1000)
  }

  resumeTime = () => {
    this.setState({started: false})
    clearInterval(this.timerID)
  }

  resetTime = () => {
    const {reset} = this.state
    clearInterval(this.timerID)
    this.setState({mintues: reset, seconds: '00', started: false})
  }

  render() {
    const {mintues, seconds, started, reset} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="main-container">
          <div className="timer-container">
            <div className="timer-sub-container">
              <h1 className="timer">
                {mintues}:{seconds}
              </h1>
              <p className="status">{started ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="control-container">
            <div className="start-pause-reset-container">
              <div className="start-pause-container">
                {started ? (
                  <button
                    onClick={this.resumeTime}
                    type="submit"
                    className="start-pause-container"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                    />

                    <p>Pause</p>
                  </button>
                ) : (
                  <button
                    onClick={this.timerStart}
                    type="submit"
                    className="start-pause-container"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />

                    <p>Start</p>
                  </button>
                )}

                <button
                  type="submit"
                  onClick={this.resetTime}
                  className="reset-container"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p>reset</p>
                </button>
              </div>
              <p className="time-limit-heading">Set Timer limit</p>
              <div className="timer-setup-container">
                <button type="submit" onClick={this.setTimeLimitDecrease}>
                  -
                </button>
                <div className="timer-setup">
                  <p>{reset}</p>
                </div>
                <button type="submit" onClick={this.setTimeLimitIncrese}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
