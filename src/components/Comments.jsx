import React from 'react'
import Comment from './Comment'

function Comments({comments, authorName, comment}) {
  return (
    <div className='flex flex-col min-h-screen w-full items-start gap-1'>
        {comments ? comments.map((commentVar, index) => {
            return(<div key={index}>
                <Comment authorName={authorName} comment={commentVar} />
            </div>)
        }) : []}
    </div>
  )
}

export default Comments