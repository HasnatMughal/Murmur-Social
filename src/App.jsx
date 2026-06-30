import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import { Outlet, RouterProvider } from 'react-router'
import Container from './components/Container/Container'
import { useDispatch } from 'react-redux'
import authentication from './Auth/auth'
import { login, logout } from '../store/authSlice'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
useEffect( () => {
  authentication.checkUser().then(userData => {
    if(userData){
      dispatch(login({userData: JSON.parse(JSON.stringify(userData))})) 
    } else{
      dispatch(logout())
    }
  }
  ).catch(
    () => {
      dispatch(logout())
    }
  )
      
      
    },[])

   
  return (

    
    <>
   
     <main>
      <Outlet />
     </main>
  
    </>
  )
}

export default App
