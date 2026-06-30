import React, { useEffect, useState } from 'react'

function PostTime({createdAt}) {
    const [uploadDate, setUploadDate] = useState('')
   

    function PostTime(){
        const now = new Date()
        console.log("now, ",now);
       
        
        const created = new Date(createdAt)
        console.log("created",created);
        
        const diff =Math.floor(( now - created)/1000)

        const minutes = Math.floor(diff / 60)
         setUploadDate(`${minutes} ${minutes <= 1 ? "minute" : "minutes"} ago`)
        if(minutes > 59){
            const hours =Math.floor(minutes / 60) 
             setUploadDate(`${hours} ${hours <= 1 ? "hour" : "hours"} ago`)
            if(hours > 23){
                const days = Math.floor(hours / 24)
                setUploadDate(`${days} ${days <= 1 ? "day" : "days"} ago`)
            }
        } 

        
        console.log("diff",diff);
        

    }
    useEffect(() => {
        PostTime()
    }, [createdAt])
  return (
    <p className='text-sm text-gray-400'>{uploadDate}</p>
  )
}

export default PostTime