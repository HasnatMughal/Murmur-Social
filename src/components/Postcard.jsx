import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import databaseService from '../Auth/config'
import authentication from '../Auth/auth'
import PostTime from './PostTime'

function Postcard({textContent,id, createdAt, imgUrl , likes, likedUsers, comments, shares, authorName}) {
    const imageUrl  = databaseService.showImage(imgUrl)
    // console.log(imageUrl);
    const author = useSelector((state) => state.auth.userData)
    const authorId = author? author.id : ""

    const [currentUserId, setCurrentUserId] = useState("")
    async function getCurrentUser(){
      try {
        const fetchedUser = await authentication.checkUser()
        if(fetchedUser){
          setCurrentUserId(fetchedUser.$id)
          console.log(currentUserId);
          if(likedUsersVar.includes(currentUserId)){
            setLikedStatus(true)
          } else{
            setLikedStatus(false)
          }
          
        }
      } catch (error) {
        
      }
    }
useEffect(() => {
  getCurrentUser()
  
},[currentUserId])
    const sp = authorName?authorName.slice(0,2) : "??"
    // console.log(sp);
    const [likedUsersVar, setLikedUsersVar] = useState(likedUsers ?? [])
  
    
   const [likesVar, setLikesVar] = useState(likes)
   

   useEffect(() => {
    if(likedUsers){
      setLikedUsersVar(likedUsersVar)
      
    }
    if(likes > 0){
      setLikesVar(likesVar)
    }
   },[likedUsers, likes])
   const [likedStatus, setLikedStatus] = useState(likedUsersVar.includes(currentUserId) ? true : false)

   async function updateLikes(){
    if(likedUsersVar.includes(currentUserId)){
      const newlikes = likesVar - 1
      setLikesVar(newlikes)
     const updatedLikedUsers = likedUsersVar.filter((likedUser) => likedUser !== currentUserId)
     setLikedUsersVar(updatedLikedUsers)
     setLikedStatus(false)
      try {
        const updatedLikes = await databaseService.updatePost(id, {
          likes:newlikes,
          likedUsers:updatedLikedUsers
        })
      } catch (error) {
        
      }
      return
    } else if(!likedUsersVar.includes(currentUserId)){
      const newlikes = likesVar + 1
      setLikesVar(newlikes)
      const updatedLikedUsers = ([...likedUsersVar, currentUserId])
      setLikedUsersVar(updatedLikedUsers)
      setLikedStatus(true)
      try {
        const updatedLikes = await databaseService.updatePost(id, {
          likes:newlikes,
          likedUsers:updatedLikedUsers
        })
      } catch (error) {
        
      }
      return
    }
   }
     
  return (
    <div className='flex flex-col w-full   gap-2 bg-gray-100 border border-gray-200 p-4 rounded-lg'>
  <div className='flex items-center gap-2'>
    <div  className='w-8 h-8 rounded-full flex items-center bg-gray-900 text-white justify-center capitalize' alt="" >{sp}</div>
    <Link to={`/feed/profile/${authorName}`}>
    <p className=' font-medium capitalize'>
      {authorName}</p>
    <PostTime  createdAt={createdAt}/>
    </Link>
  </div>
      <Link to={`/feed/post/${id}`}>
  <div className='w-full'>
    <p className='text-sm mb-2'>{textContent}</p>
    {imageUrl && (
      <img src={imageUrl} className='object-cover w-full h-96 max-h-96 rounded-lg' alt="" />
    )}
  </div>
  </Link>
  <div className='w-full flex flex-row mt-2 text-sm'> {likesVar} likes</div>
  <div className='w-full h-1 bg-gray-100'></div>
  <div className='flex justify-between w-full border-t border-gray-200 pt-2'>
    <button className={`hover:bg-gray-200 px-3 py-1 ${likedStatus === true? "text-blue-400" : "text-black" } rounded text-sm`} onClick={() => updateLikes()}> Like</button>
    <button className='hover:bg-gray-200 px-3 py-1 rounded text-sm'>
      <Link to={`/feed/post/${id}`}>{comments} Comments</Link>
    </button>
    <button className='hover:bg-gray-200 px-3 py-1 rounded text-sm'>{shares} Shares</button>
  </div>
</div>
  )
}

export default Postcard