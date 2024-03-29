import React from 'react'
import ReactDOM from 'react-dom/client'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import{RouterProvider, createBrowserRouter} from "react-router-dom"
import  Register  from './pages/register/Register'
import  Login  from './pages/login/Login'
import  Home  from './pages/home/Home'
import  Found  from './pages/notFound/notFound'
import { Layout } from './components/layout/Layout'



const router =createBrowserRouter([
  
    {
      path : '/',
        element : <Layout/>,
      children: [
        {
          path : '/',
          element : <Home/>
        },
        
       
      ]
    },
    {
      path : '/login',
      element : <Login/>
    },

    {
      path : '/signup',
      element : <Register/>
    },

    {
      path : '/*',
      element : <Found/>
    },

    // {
    //   path : '/profile',
    //   element : <Profile/>
    // },

    // {
    //   path : '/activities',
    //   element : <Activities/>
    // }
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  
  <RouterProvider router ={router}/>
  
  
</React.StrictMode>,
)
