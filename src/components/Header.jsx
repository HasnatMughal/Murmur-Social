import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Logo from './Logo'
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineUser} from "react-icons/ai"
import { IoNotificationsOutline, IoNotifications } from 'react-icons/io5'
import { IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5'
import { HiOutlineFire } from 'react-icons/hi'
import authentication from '../Auth/auth'
import { useSelector } from 'react-redux'

function Header() {
    const [viewSettings, setviewSettings] = useState(false)
    const [showIconText, setShowIconText] = useState(false)
    const [currentUsername, setCurrentUserName] = useState('')

    const author = useSelector((state) => state.auth.userData)
    const authorName = author? author.name : ""

    // async function getCurrentUser() {
    //     try {
    //         const currentUser = await authentication.checkUser()
    //         if(currentUser){
    //             console.log(currentUser);
                
    //         }
    //     } catch (error) {
            
    //     }
    // }

    // useEffect(() => {
    //     getCurrentUser()
    // },[])
    const routings = [
        {
            key:1,
            path: "/feed",
            element : <AiOutlineHome  className='w-8 h-8'/>,
            label:"Feed"
        },
        {
             key:2,
            path: `/feed/profile/${authorName}`,
            element : <AiOutlineUser className='w-8 h-8'/>,
            label:"Profile"
        },
        
        {

            key: 3,
            path: "/feed/createPost",
            element : <IoSettingsOutline className='w-8 h-8'/>,
            label:"Write Post"
        },
        {
            key: 4,
            path: "/feed/trending",
            element : <HiOutlineFire className='block  w-8 h-8'/>,
            label:"Trending"
        }
        
    ]
  return (
    <div className='md:min-h-screen p-2  md:p-4 min-w-1/3  bg-gray-50 flex  gap-8 sm:gap-12  md:flex-col '>
        <div className='  md:w-full '>
    <Logo />
        </div>
    <div className={`flex  justify-center gap-6  md:flex-col md:mt-5 md:gap-4`}  >
        {routings.map((routing) => {
            return(<Link key={routing.key} className='flex items-center gap-2  md:w-full' to={routing.path}>{routing.element} <span className='hidden md:block'>{routing.label}</span></Link>)
        })}
    </div>
    
    </div>
  )
}

export default Header