import React from 'react'
import ReactDOM from 'react-dom/client'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import{RouterProvider, createBrowserRouter} from "react-router-dom"
import  Register  from './pages/register/Register'
import  Login  from './pages/login/Login'
import  Home  from './pages/home/Home'
import  Found  from './pages/notFound/notFound'
import { Layout } from './components/layout/Layout'
import { PrivateRoute } from './components/PrivateRoute'
import { Provider } from 'react-redux'
import {store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import  {persistor}  from './redux/store'
import ActivitiesHomePage from './pages/activitiesPage/ActivitiesPage'
import CreateActivity from './pages/activitiesPage/create/CreateActivity'
import { PrivateRole } from './components/PrivateRole'
import Admin from './pages/Dashboard/admin/Admin'
import Partner from './pages/Dashboard/partner/Partner'
import ActivityPage from './pages/activitiesPage/ActivityPage'



const router =createBrowserRouter([
  
    {
      path : '/',
        element : <Layout/>,
      children: [
        {
          path : '/',
          element : <Home/>
        },

        {
          path : '/activities/list',
          element : <ActivitiesHomePage/>
        },
        {
          path : '/activities/single/:id',
          element : <ActivityPage />
        },

        {
          path : '/dashboard/partner/create',
          element : <CreateActivity/>
        },

        {
          
          path : '/dashboard/admin',
          element : 
          <PrivateRole role="admin">
          <Admin/>
          </PrivateRole>

        },

        {
          
          path : '/dashboard/partner',
          element : 
          
          <Partner/>
         

        },
        
       
      ]
    },
    {
      path : '/partner/login',
      element : <Login/>
    },

    {
      path : '/partner/signup',
      element : <Register/>
    },

    

    {
      path : '/*',
      element : <Found/>
    },

    // {
    //   path : '/profile',
    //   element : <PrivateRoute> <Profile/></PrivateRoute>
    // },

    // {
    //   path : '/activities',
    //   element : <Activities/>
    // }
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        
      
  <React.StrictMode>

  
  <RouterProvider router ={router}/>
  
  
</React.StrictMode>,
</PersistGate>
</Provider>
)
