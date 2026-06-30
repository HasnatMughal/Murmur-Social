import React from 'react'
import databaseService from '../Auth/config'
import { Link } from 'react-router'

function TrendingPost({imgUrl, text,id, rank, likes}) {
    const imageUrl = databaseService.showImage(imgUrl)
  
  return (
    <Link to={`/feed/post/${id}`}>
  <div className='flex flex-col items-center gap-2 p-3 hover:bg-gray-100 rounded-xl transition-colors w-48 h-64 md:h-24 md:w-96 cursor-pointer lg:flex-row lg:items-start lg:gap-3'>
    <span className='text-2xl font-bold text-gray-200'>{rank}</span>
    <img src={imageUrl} className='w-32 h-32 lg:w-12 lg:h-12 rounded-lg object-cover flex-shrink-0' alt="" />
    <div className='flex flex-col items-center lg:items-start'>
      <p className='text-sm font-medium text-gray-800 line-clamp-2 text-center lg:text-left'>{text}</p>
      <p className='text-xs text-gray-400 mt-1'>{likes} likes</p>
    </div>
  </div>
</Link>
  )
}

export default TrendingPost