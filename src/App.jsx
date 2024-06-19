import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginToken from './components/LoginToken.jsx';
import EditContactPage from './pages/EditContactPage.jsx';
import CreateContactPage from './pages/CreateContactPage.jsx'
function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <HomePage/> : <LoginPage/>}/>
        <Route path="/token" element={<LoginToken/>}/>
        <Route path="/contact/edit/:id" element={<EditContactPage/>}/>
        <Route path="/contact/create" element={<CreateContactPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
