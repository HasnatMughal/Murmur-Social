import React, { useState } from 'react'
import Logo from './Logo'
import {Link,useNavigate} from "react-router"
import Input from './Input'
import authentication from '../Auth/auth'
import signUpPic from "../assets/images/signUp.jpg"


function Signup() {
    const [name, setname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    console.log(email, name, password)

    const handleSubmit = async ({name, email,password}) => {
        try {
          const userAccount =  await authentication.createAccount({
            name, email, password, 
          }) 
          if(userAccount){
           navigate("/feed")
          }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
        
    <div className='bg-white  shadow-md px-4 py-8 min-w-1/2 w-full flex flex-col items-center min-h-3/4 h-full rounded-2xl gap-4 '>
        <div className='flex flex-col  items-center'>
        <Logo />
            <h1 className='text-xl text-gray-500'>Connect together and share thoughts</h1>
        </div>
        <form action="" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({name, email, password})}} className='flex flex-col w-2/3 mt-5 gap-4  '>
           
            <Input type={"text"} placeholder={"Username"} onChange={(e) => setname(e.target.value)}  />
            
            <Input type={"email"} placeholder={"Email adress"} onChange={(e) => setEmail(e.target.value)}/>
            
            <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
            <button className='w-full bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-2xl' type='submit'>Sign Up</button>
            </form>
            <h2 className=''>
            Already have an account? <Link to="/" className='hover:text-blue-400'>Login</Link>
        </h2>
            </div>
           
  )
}

export default Signup