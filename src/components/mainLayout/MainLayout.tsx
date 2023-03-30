import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import TopAppBar from './menu/TopAppBar'

const drawerWidth = 280

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
