import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <HomePage/> : <LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
