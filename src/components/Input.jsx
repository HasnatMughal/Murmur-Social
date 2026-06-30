import React from 'react'

function Input({type, placeholder,value, className, onChange}) {
  return (
    
    <input type={type} placeholder={placeholder} value={value} className={`px-3 py-2 min-w-72 md:min-w-96  w-full focus:bg-gray-300 border-gray-300 border outline-none rounded-lg duration-200 ${className}`} onChange={onChange}/>
    
    
  )
}

export default Input