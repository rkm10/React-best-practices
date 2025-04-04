import { useEffect, useRef, useState } from 'react'

// Number of input fields for OTP validation
const OTP_VALIDATE_INPUT_COUNT = 6

function OtpValidation() {
  // State to store the value of each input field
  const [inputArr, setInputArr] = useState(new Array(OTP_VALIDATE_INPUT_COUNT).fill(''))

  // Array of refs to access each input field directly
  const refArr = useRef([])

  // Handle changes in input fields
  const handleInputChange = (value, index) => {
    // Return if input is not a number
    if (isNaN(value)) return

    // Create a copy of the current input array
    const newArr = [...inputArr]
    // Clean the input value and take only the last character
    const newValue = value.trim();
    newArr[index] = newValue.slice(-1)
    // Update the state with new array
    setInputArr(newArr)
    // If there's a value, move focus to next input field
    newValue && refArr.current[index + 1]?.focus()
  }

  // Focus on first input field when component mounts
  useEffect(() => {
    refArr.current[0]?.focus()
  }, [])

  // Handle backspace key press
  const handleKeyDown = (e,index) =>{
    // If current field is empty and backspace is pressed, move focus to previous field
    if (!e.target.value && e.key ==='Backspace'){
      refArr.current[index - 1]?.focus();
    }
  }

  return (
    <div className='otp-container'>
      <h1>OTP Validate</h1>
      {
        // Map through input array to create input fields
        inputArr.map((item, index) => {
          return <input 
          className='otp-input' 
          type="text" 
          key={index} 
          value={inputArr[index]} 
          // Store reference to input field
          ref={input => refArr.current[index] = input}
          // Handle input change and key press events
          onChange={(e) => handleInputChange(e.target.value, index)} 
          onKeyDown={(e) => handleKeyDown(e, index)}
          />
        })
      }
    </div>
  )
}

export default OtpValidation

