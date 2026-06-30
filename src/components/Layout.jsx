import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

function Layout({children}) {
  return (
    <div className='flex flex-col md:flex-row justify-between w-full min-h-screen'>
      <div className='w-full md:w-1/5'>
        <Header />
      </div>
    <div className='md:flex-1'>
        <Outlet />
    </div>
      </div>
  )
}

export default Layout