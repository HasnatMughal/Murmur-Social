import React from 'react'
import PostForm from '../components/PostForm'

function CreatePost() {
  return (
    <div className='w-full min-screen mx-auto mt-5 ml-5 '>
         <h1 className="text-3xl ">Create Post</h1>
        <PostForm />
    </div>
  )
}

export default CreatePost