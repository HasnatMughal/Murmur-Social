import React from 'react'
import logo from "../assets/images/murmur_logo_3-removebg-preview.png"

function Logo() {
  return (
    <div className=' min-w-12 w-24  md:min-w-24 md:w-36'>
        <img src={logo} className='w-full' />
    </div>
  )
}

export default Logo