import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router'
import authentication from '../Auth/auth'

function Protected({children}) {
    const [authorized, setAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkAuth(){
            try {
                const authorizedUser = await authentication.checkUser()
                if(authorizedUser) setAuthorized(true)
            
    
                } catch (error) {
                    
                }
                setLoading(false)
                
            }
            checkAuth()
        }, [])
        
        if(loading) return <p>Loading...</p>
        
        if(authorized === false) return <Navigate to={"/"} />

        

        return children
    
 
}

export default Protected