import { toast, ToastContainer } from 'react-toastify'
import './App.css'

import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/mainLayout/MainLayout'
import Home from './pages/Home'

import 'react-toastify/dist/ReactToastify.css'
import useApiCall, { HttpRequestType } from './constants/useApiCall'
import { ISections } from './constants/models'
import DeactiveTodo from './pages/DeactiveTodo'
import ActiveTodo from './pages/ActiveTodo'

function App() {
  const [sections, setSections] = useState<ISections[]>([])
  const httpProvider = useApiCall()

  useEffect(() => {
    LoadData()
  }, [])

  /**
   * load section data
   */
  const LoadData = () => {
    httpProvider
      .sendRequest<ISections[]>('/sections', HttpRequestType.Get)
      .then((responseData) => {
        if (responseData.success === true && responseData.data) {
          setSections(responseData.data)
        } else {
          toast.error('Data was not loaded')
        }
      })
  }
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
          <Route
            path="/"
            element={<Home LoadData={LoadData} sections={sections} />}
          />
          <Route
            path="deactiveTodo"
            element={<DeactiveTodo LoadData={LoadData} sections={sections} />}
          />
          <Route
            path="activeTodo"
            element={<ActiveTodo LoadData={LoadData} sections={sections} />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
