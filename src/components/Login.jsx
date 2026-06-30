import React, { useState } from 'react'
import Input from './Input'
import databaseService from '../Auth/config'
import authentication from '../Auth/auth'
import {useDispatch, useSelector} from "react-redux"
import { login } from '../../store/authSlice'
import {Link, useNavigate} from "react-router"
import Logo from './Logo'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDataExisting = useSelector((state) => state.auth.userData)
    // console.log(userDataExisting);
    

    const handleSubmit = async ({email, password}) => {
//         if(userDataExisting){
//                 navigate("/feed")
//             }

        let existingSession = null
        try {
            const existingSession = await authentication.checkUser()
            if(existingSession){
               await authentication.logout()
               
            }
        } catch (error) {
            console.log(error);
            
        }



            
            
        try {
            
           const session = await authentication.login({email, password})
            if(session){
                const userData = await authentication.checkUser()
                if(userData) {
                    dispatch(login({userData:JSON.parse(JSON.stringify(userData))}))
                    navigate("/feed")
                }
            }
           console.log(existingSession,session);
           
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <>
    <div className='bg-white  shadow-md px-4 py-8 min-w-1/3 w-full h-full flex flex-col items-center min-h-3/4 rounded-2xl gap-4 '>
    <div className='flex flex-col items-center'>
    <Logo />
    <h1 className='text-xl text-gray-500'>Connect together and share thoughts</h1>
    </div>
    <form action="" onSubmit={(e) =>{ 
        e.preventDefault()
        handleSubmit({email, password})
        }} className='mt-5 flex flex-col w-2/3 gap-4  '>
        
        <Input type={"email"} placeholder={"Email Adress"} onChange={(e) => setEmail(e.target.value)}/>
        
        <Input type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}/>
        <button className='w-full bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-2xl' type='submit'>Login</button>
        </form>
        <h2 className=''>
        New here? <Link to="/signUp" className='hover:text-blue-400'>Register</Link>
    </h2>
        </div>
        </>
  )
}

export default Login