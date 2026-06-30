import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "../store/store.js"
import {Provider} from "react-redux"
import { BrowserRouter, RouterProvider, Routes, createBrowserRouter } from 'react-router'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Homepage from './pages/Homepage.jsx'
import PostForm from './components/PostForm.jsx'
import Layout from './components/Layout.jsx'
import CreatePost from './pages/CreatePost.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Post from './components/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import TrendingPage from './pages/TrendingPage.jsx'
import Protected from './components/Protected.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element : <App />,
    children : [
      {
        path:"/",
        element : <LoginPage />
      },
      {
        path:"/signUp",
        element:<SignUpPage />
      },
      {
        path: "/feed",
        element: <Layout />,
        children: [
          {
            path: "/feed",
            element: 
            <Protected>
            <Homepage />
            </Protected>
          },
          {
        path:"/feed/createPost",
        element: <Protected> <CreatePost /></Protected>
      },
       {
        path : "/feed/profile/:authorName",
       element: <Protected><ProfilePage /></Protected>
      },
       
      {
        path: "/feed/post/:postId",
        element :<Protected> <Post /> </Protected>
      },
      {
        path: "/feed/editPost/:id",
        element:<Protected> <EditPost /> </Protected>
      },
      {
        path:"/feed/trending",
        element:<Protected><TrendingPage /> </Protected>
      }
     
        ]
      },
     
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
