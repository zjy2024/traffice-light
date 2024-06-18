import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [light, setLight] = useState('red')
  const [count, setCount] = useState(0)

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const changeLight = async (currentLight: string) => {
        switch (currentLight) {
          case 'green':
            setLight('yellow')
            await sleep(1000)
            changeLight('yellow')
            break
          case 'yellow':
            setLight('red')
            await sleep(2000)
            changeLight('red')
            break
          case 'red':
            setLight('green')
            await sleep(3000)
            changeLight('green')
            break
          default:
            setLight('green')
        }
    }

    changeLight(light)

    const now = Date.now();
    const timer = setInterval(() => {
      setCount(Date.now() - now);
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="container">
      <div className="traffic-light">
        <div className={`light circle red ${light === 'red' ? 'active' : ''}`}></div>
        <div className={`light circle yellow ${light === 'yellow' ? 'active' : ''}`}></div>
        <div className={`light circle green ${light === 'green' ? 'active' : ''}`}></div>
      </div>

      <div className='counter-container'>
        <div className='counter'>{(count / 1000).toFixed(0)}</div>
      </div>
    </div>
  )
}

export default App
