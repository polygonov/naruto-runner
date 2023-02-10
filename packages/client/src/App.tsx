import { useEffect } from 'react'
import './App.css'
import { Leaderboard } from './components/Leaderboard'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">
    <Leaderboard/>
  </div>
}

export default App


