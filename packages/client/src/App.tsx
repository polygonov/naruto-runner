// import { useEffect } from 'react';
// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Main } from './pages/Main';

import './App.css';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={'<Login />'} />
        <Route path='/registration' element={'<Registration />'} />
        <Route path='/profile' element={'<Profile />'} />
        <Route path='/leaderboard' element={'<Leaderboard />'} />
        <Route path="*" element={'<NotFound />'} />
      </Routes>
    </MainLayout>
  )
}

// function App() {
//   useEffect(() => {
//     const fetchServerData = async () => {
//       const url = `http://localhost:${__SERVER_PORT__}`
//       const response = await fetch(url)
//       const data = await response.json()
//       console.log(data)
//     }

//     fetchServerData()
//   }, [])
//   return <div className="App">Вот тут будет жить ваше приложение :)</div>
// }

export default App
