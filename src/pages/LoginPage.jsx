import React from 'react'
import Container from '../components/Container/Container'
import Login from '../components/Login'
import signUpPic from "../assets/images/signUp.jpg"

function LoginPage() {
  return (
  
       <div className='flex flex-row  w-full justify-center bg-gray-50 h-screen'>

        <div className='md:w-1/2 h-full '>
        <img src={signUpPic} className='hidden md:block w-full h-full object-cover' alt="" />
        </div>
          <div className='w-full   md:w-1/2 flex items-center justify-center h-screen'>
<Login />
          </div>
        </div>
 
    
  )
}

export default LoginPage