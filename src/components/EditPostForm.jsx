import React, { useEffect, useState } from 'react'
import { data, useParams, useNavigate } from 'react-router'
import databaseService from '../Auth/config'
import { useSelector, useDispatch } from 'react-redux'
import { updatePost } from '../../store/postSlice'
import DeletePost from './DeletePost'

function EditPostForm() {
    const {id} = useParams()
    const [postText, setPostText] = useState('')
    const [oldPostImage, setOldPostImage] = useState('')
    const [ImageFile, setImageFile] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

   async function getPost(){
    try {
      const oldPostData =  await databaseService.showPost(id)
      if(oldPostData){
        console.log(oldPostData);
        // dispatch(updatePost())
        setPostText(oldPostData.text)
        setOldPostImage(oldPostData.imgUrl)
      }
    } catch (error) {
        
    }
    }

    useEffect(() => {
        getPost()
    }, [])

    async function handleSubmit(){
        try {
            if(ImageFile){
                
const newImageFile = await databaseService.uploadImageFile(ImageFile)
            if(newImageFile){
           const newPostData = await databaseService.updatePost(id, {
                    text:postText, 
                    imgUrl : newImageFile.$id 
                })
               
                navigate("/feed")
            }
            } else if(!ImageFile){
                const newPostData = await databaseService.updatePost(id, {
                    text: postText
                })
            }
            
        } catch (error) {
            
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
      <textarea placeholder={"What's or your mind"} onChange={(e) => setPostText(e.target.value)} value={postText} className='px-3 border-gray-300 border min-w-72 min-h-42 py-3 focus:bg-gray-100 outline-none rounded-2xl w-full' />
        <img src={databaseService.showImage(oldPostImage)} className='w-1/4' alt="" />
      <div>

        <input type="file" id='image' onChange={(e) => setImageFile(e.target.files[0])}  className='hidden'  />
        <label htmlFor="image"  className='text-blue-500 border-blue-400 border p-2'>Upload image</label>
        </div>
        <button type='submit' className='bg-blue-600 text-white min-w-32 w-full px-2 py-3'>Update</button>
        <DeletePost id={id}/>
        </form>
    </div>
        
    </div>
  )
}

export default EditPostForm