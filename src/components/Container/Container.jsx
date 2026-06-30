import React from 'react'

function Container({children}) {
  return (
    <div className='mx-auto w-full min-h-screen max-w-7xl'>{children}</div>
  )
}

export default Container