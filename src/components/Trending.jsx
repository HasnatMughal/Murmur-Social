import React, { useEffect, useState } from 'react'
import databaseService from '../Auth/config'
import TrendingPost from './TrendingPost'

function Trending() {
    const [trendingPosts, setTrendingPosts] = useState([])
    
    const [loading, setLoading] = useState(true)
    async function getAllPosts() {
        try {
            const posts = await databaseService.listAllPosts()
            if(posts){
                const allPosts = posts.documents
              const newTrendPosts =  allPosts.sort((a,b) => b.likes - a.likes)
              console.log(newTrendPosts);
              
              setTrendingPosts(newTrendPosts)
              setLoading(false)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getAllPosts()
        
    },[])
  return (
    <div className='flex mt-5 flex-col  w-full items-center min-h-screen'>
        {loading === true ? (<p>Loading...</p>): trendingPosts? trendingPosts.slice(0, 5).map((post, index) => (
      <TrendingPost
        key={post.$id}
        rank={index + 1}
        text={post.text}
        imgUrl={post.imgUrl}
        likes={post.likes}
        id={post.$id}
      />
    )): []}
    </div>
  )
}

export default Trending