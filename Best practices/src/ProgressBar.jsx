import React, { useState } from 'react'


const Progress = ({ percentage, color }) => {
  const containerStyle = {
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: '50px',
    padding: '3px',
    overflow: 'hidden',
  }

  const fillerStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
    textAlign: 'center',
  }

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}>{`${percentage}%`}</div>
    </div>
  )
}

function ProgressBar() {
    const [percent, setPercent] = useState(0)

    const handleIncrease = () => {
        // Check if percent is less than 100 before increasing
        if (percent < 100) {
            setPercent(percent + 10)
        }if (percent >= 100) {
            setPercent(100)
        }
    }
    const handleDecrease = () => {
        // Check if percent is greater than 0 before decreasing
        if (percent > 0) {
            setPercent(percent - 10)
        }if (percent <= 0) {
            setPercent(0)
        }
    }
  return (
    <div>
      <h1>Progress Bar</h1>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
        <button onClick={() => setPercent(0)}>Reset</button>
      <Progress percentage={percent} color="blue" />
    </div>
  )
}

export default ProgressBar
