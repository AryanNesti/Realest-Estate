import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Homepage from './pages/Homepage'
import Favorites from './pages/Favorites'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useState } from 'react';


function App() {
  const [theme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  return (
    <>
      <Router>
        <div id={`App ${theme}`} className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;