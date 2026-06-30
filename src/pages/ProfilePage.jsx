import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import databaseService from '../Auth/config'
import PostCardSmall from '../components/PostCardSmall'
import Post from '../components/Post'
import Logout from "../components/Logout"

function ProfilePage() {
    const {authorName} = useParams()
    const [userPosts, setUserPosts] = useState([])
  const [authorNameVar, setAuthorNameVar] = useState(authorName)
  const [viewPost, setViewPost] = useState(false)

  const [loading, setLoading] = useState(true)

         const author  = useSelector(state => state.auth.userData)
    const authorSabName = author?author.name : ""
useEffect(() => {
    console.log("setting")
    setAuthorNameVar(authorNameVar)
},[authorName])
   
   
  
    const getUserPosts = async(name) => {
        try {
            // console.log(auhtorName);
            
            const postsfetch = await databaseService.listUserPosts(name)
            // console.log(postsfetch);
            setUserPosts(postsfetch.documents)
            setLoading(false)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getUserPosts(authorNameVar)
    },[authorNameVar])
    // const userName = author ? author.n
  return (
    <div className='flex flex-col items-center relative mt-5'>
        <div className='absolute top-0 right-0'>
        <Logout />
    </div>
        <div className='flex items-center flex-col   gap-2 '>
        <div className='bg-gray-900 uppercase flex items-center justify-center text-white w-32 h-32 rounded-full text-3xl font-semibold'>
            {authorName.slice(0,2)}
        </div>
        <h1 className='text-3xl font-bold uppercase'>{authorName}</h1>
        </div>
        <div className='bg-gray-100 w-full min-h-screen p-4 grid grid-cols-2 md:grid-cols-4 gap-2 mt-5'>
            {loading ? <p>Loading Posts...</p> :
                userPosts && userPosts.map((post) => {
                    return(
                        <li key={post.$id} >
                            <PostCardSmall  authorName={post.a} imgUrl={post.imgUrl} likes={post.likes > 0 ? post.likes : "0"} postId={post.$id} />
                        </li>
                       
                    )
                   

                    
                }) 
            }
            
        </div>
    </div>
  )
}

export default ProfilePage