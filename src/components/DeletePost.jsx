import React from 'react'
import databaseService from '../Auth/config'
import { useNavigate, useParams } from 'react-router'

function DeletePost({id}) {
    const {authorName} = useParams()
    const navigate = useNavigate()
    async function handleDelete(){
        try {
            const deletingPost = await databaseService.deletePost(id)
                navigate("/feed/profile/:authorName")
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <button className='w-full bg-red-500 text-white py-3' onClick={() => handleDelete()}>Delete</button>
  )
}

export default DeletePost