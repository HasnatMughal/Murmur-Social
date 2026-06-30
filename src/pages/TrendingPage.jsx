
import Trending from '../components/Trending'
import React, { useEffect, useState } from 'react'
import databaseService from '../Auth/config'
import TrendingPost from '../components/TrendingPost'

function TrendingPage() {
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
    <div className='min-h-screen  '>
        <h1 className='text-3xl text-center font-semibold'>What's Trending</h1>
    <div className='grid grid-cols-2'>
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
        </div>
  )
}

export default TrendingPage