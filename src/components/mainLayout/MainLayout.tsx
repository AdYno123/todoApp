import React from 'react'
import { Outlet } from 'react-router-dom'
import TopAppBar from './menu/TopAppBar'

interface IProps {
  window?: () => Window
}

const MainLayout: React.FC<IProps> = (props) => {
  return (
    <>
      <TopAppBar />
      <Outlet />
    </>
  )
}

export default MainLayout
