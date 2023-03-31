import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const TopAppBar = () => {
  const [navbar, setNavbar] = useState<boolean>(false)
  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h2 className="text-2xl font-bold">TODO</h2>

            <div className="md:hidden">
              <button
                className="p-2 text-white font-bold  rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}>
                {!navbar ? 'MENU' : 'X'}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-10 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}>
            <span className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 ">
              <div className="w-full">
                <NavLink
                  className="text-gray-600 hover:text-blue-600 "
                  to={'/'}>
                  All
                </NavLink>
              </div>
              <div className="w-full">
                <NavLink
                  className="text-gray-600 hover:text-blue-600 "
                  to={'/deactiveTodo'}>
                  Done
                </NavLink>
              </div>
              <div className="w-full">
                <NavLink
                  className="text-gray-600 hover:text-blue-600 "
                  to={'/activeTodo'}>
                  Waiting
                </NavLink>
              </div>
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopAppBar
