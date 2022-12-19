import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data, setData] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/hello')
  .then((response) => response.json())
  .then((data) => setData(data));
  })

  return (
    <div className="App">
      {data.message}
    </div>
  )
}

export default App
