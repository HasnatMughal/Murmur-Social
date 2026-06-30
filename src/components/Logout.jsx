import React from 'react'
import databaseService from '../Auth/config'
import authentication from '../Auth/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router'

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClick = async() => {
        try {
            const session = await authentication.checkUser()
            if(session){
                await authentication.logout()
                dispatch(logout())
                navigate("/")
            }
        } catch (error) {
            
        }
    }
  return (
    <button onClick={() => handleClick()} className='bg-red-600 text-white px-3 py-2 rounded-2xl'>Logout</button>
  )
}

export default Logout