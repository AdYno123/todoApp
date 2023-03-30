import { ToastContainer } from 'react-toastify'
import './App.css'

import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Info from './pages/Info'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" data-testid="app-page">
      <ToastContainer
        theme="colored"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
