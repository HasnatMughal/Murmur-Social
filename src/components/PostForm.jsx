import React, { useState } from 'react'
import Input from "./Input"
import databaseService from '../Auth/config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ID } from 'appwrite';
import { addPost } from '../../store/postSlice';


function PostForm() {
  const [postContent, setpostContent] = useState('')
  const [postImage, setPostImage] = useState(null)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState(null)
  const [shares, setShares] = useState(null)
  // console.log(postImage);
  const userDataExisting = useSelector(state => state.auth.userData)
  const authorName = userDataExisting? userDataExisting.name : ""
  const authorid = userDataExisting? userDataExisting.$id : ""
  const dispatch = useDispatch()
  // console.log(authorName, authorid, postContent);
  
  // console.log(authorName);
  const navigate = useNavigate()
  
  const handleSubmit = async() => {
    try {
      if(postImage){
const imageFile = await databaseService.uploadImageFile(postImage)
      
      
      if(imageFile){
        console.log(imageFile);
        
        const post = await databaseService.createPost({text:postContent, authorName,authorId:authorid, imgUrl:imageFile.$id, comments:comments, likes:likes,shares: shares })
        if(post){
          console.log("post uploaded");
          dispatch(addPost({post}))
          navigate("/feed")
        }
        
      }
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }
  
  return (
    <div className='flex flex-col items-center mt-5 h-1/2 w-1/2 '>
       
    <div className='min-h-screen w-full flex  flex-col'>
<form action="" onSubmit={
  (e) => {
e.preventDefault()
handleSubmit()
  }
} className='flex flex-col  gap-4 h-full'>
      <textarea placeholder={"What's or your mind"} onChange={(e) => setpostContent(e.target.value)} className='px-3 border-gray-300 border min-w-72 min-h-42 py-3 focus:bg-gray-100 outline-none rounded-2xl w-full' />
      <div>

        <input type="file" id='image' onChange={(e) => setPostImage(e.target.files[0])} className='hidden'  />
        <label htmlFor="image"  className='text-blue-500 border-blue-400 border p-2'>Upload image</label>
        </div>
        <button type='submit' className='bg-blue-600 text-white min-w-32 w-full px-2 py-3'>Create Post</button>
        </form>
    </div>
        
    </div>
  )
}

export default PostForm