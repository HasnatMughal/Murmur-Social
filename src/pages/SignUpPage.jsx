import React from 'react'
import Signup from '../components/Signup'
import signUpPic from "../assets/images/signUp.jpg"

function SignUpPage() {
  return (
    <div className='flex flex-row  w-full justify-center bg-gray-50 min-h-screen h-screen '>

        <div className=' md:w-1/2 h-full '>
        <img src={signUpPic} className='hidden md:block w-full h-full object-cover' alt="" />
        </div>
          <div className=' w-full  md:w-1/2 flex items-center justify-center h-screen'>
<Signup />
          </div>
        
        </div>
  )
}

export default SignUpPage