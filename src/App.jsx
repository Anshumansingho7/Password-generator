import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumber] = useState(false)
  const [characterAllowed, setCharacter] = useState(false)
  const [password, setPassword] = useState(" ")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (characterAllowed) {
      str += "@#$%&?/!><_-"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-8 my-12 bg-gradient-to-br from-purple-300 to-reb-200">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Password Generator</h1>
        
        <div className="flex shadow-md rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-gray-900 text-white placeholder-gray-400"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 transition-all duration-200">Copy</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-x-4">
            <label className="text-white">Password Length: {length}</label>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full h-2 bg-gray-700 rounded-lg appearance-none'
              onChange={(e) => { setLength(e.target.value) }}
            />
          </div>

          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumber(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-white">Allow Numbers</label>
          </div>

          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={(e) => setCharacter(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-white">Allow Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
