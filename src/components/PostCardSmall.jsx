import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import databaseService from '../Auth/config'
import authentication from '../Auth/auth'
import { useSelector } from 'react-redux'
import {AiOutlineLike} from "react-icons/ai"
import {FaPen} from "react-icons/fa"

function PostCardSmall({imgUrl,postId, authorName,likes }) {
    const imageFile = databaseService.showImage(imgUrl)
    const [currentUserId, setCurrentUserId] = useState('')
    const [viewEdit, setViewEdit] = useState(false)

    const author = useSelector((state) => state.auth.userData)
    const authorId = author? author.$id : ""
      console.log(authorId);
      
   async function getCurrentUser(){
    try {
      const fetchedUser = await authentication.checkUser()
      if(fetchedUser){
        setCurrentUserId(fetchedUser.$id)
        console.log(currentUserId);
        
      }

      
    } catch (error) {
      
    }
    }

    useEffect(() => {
      getCurrentUser()

      if(currentUserId === authorId){
        setViewEdit(true)
      }
    }, [currentUserId])

  return (
    <div className='flex flex-col relative hover:grayscale-25  p-2' >
       <Link to={`/feed/post/${postId}`}>
            <img src={imageFile} alt="" className=' object-cover ' />
            {viewEdit === true ? <Link to={`/feed/editPost/${postId}`}>
            <FaPen width={"10px"} height={"10px"} className='absolute top-4 right-4 text-white' />
            </Link> : "" }
            
            <p className='absolute bottom-2 left-2 flex  items-center text-white'>{likes} {<AiOutlineLike height={"10px"} width={"10px"} />}</p>
    </Link>
     </div>
   
  )
}

export default PostCardSmall