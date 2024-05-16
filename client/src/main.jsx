import React from 'react'
import ReactDOM from 'react-dom/client'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import{RouterProvider, createBrowserRouter} from "react-router-dom"
import  Register  from './pages/register/Register'
import  Login  from './pages/login/Login'
import  Home  from './pages/home/Home'
import  Found  from './pages/notFound/notFound'
import { NavLayout } from './components/layout/Layout'
import { PrivateRoute } from './components/PrivateRoute'
import { Provider } from 'react-redux'
import {store} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import  {persistor}  from './redux/store'
import ActivitiesHomePage from './pages/activitiesPage/ActivitiesPage'
import CreateActivity from './pages/activitiesPage/create/CreateActivity'
import { PrivateRole } from './components/PrivateRole'
import DashboardAdmin from './pages/Dashboard/admin/DashboardAdmin'
import Partner from './pages/Dashboard/partner/Partner'
import DashboardPartner from './pages/Dashboard/partner/DashboardPartner'
import ActivityPage from './pages/activitiesPage/ActivityPage'
import './style.css'
import AboutUs from './pages/about/AboutUs'
import ContactUs from './pages/contact/Contact'
import SearchPage from './pages/activitiesPage/search'
import PartnersPage from './pages/partnersPage/partnersPage'
import PartnerPage from './pages/partnersPage/partnerPage'
import Dashboard from './pages/Dashboard/admin/Dashboard'
import Profile from './pages/profile/Profile'





const router =createBrowserRouter([
  
    {
      path : '/',
        element : <NavLayout/>,
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
          path : '/about',
          element : <AboutUs />
        },

        {
          path : '/contact',
          element : <ContactUs />
        },

        {
          path : '/activities/single/:id',
          element : <ActivityPage />
        },

        {
          path : '/partners/single/:id',
          element : <PartnerPage />
        },

        {
          path : '/partners',
          element : <PartnersPage/>
        },

        {
          path : '/search',
          element : <SearchPage />
        },

        {
          path : '/profile',
          element : <Profile />
        },

        {
          path : '/dashboard/partner/create',
          element : <CreateActivity/>
        },

        {
          
          path : '/dashboard/admin',
          element : 
          // <PrivateRole role="admin">
          <DashboardAdmin/>
          // </PrivateRole>

        },

        { 
          path : '/dashboard/partner/activities',
          element : 
          
          <Partner/>
        },

        {
           path : '/dashboard/partner',
          element : 
          
          <DashboardPartner/>
        },

        {
          path : '/partner/signup',
          element : <Register/>
        },
        
       
      ]
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
