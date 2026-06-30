import React from 'react'
import EditPostForm from '../components/EditPostForm'

function EditPost() {
  return (
    <div className='w-full min-screen mx-auto mt-5 ml-5 '>
             <h1 className="text-3xl ">Edit Post</h1>
            <EditPostForm />
        </div>
  )
}

export default EditPost