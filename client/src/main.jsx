import React from 'react'
import ReactDOM from 'react-dom/client'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import{RouterProvider, createBrowserRouter} from "react-router-dom"
import  Register  from './pages/register/Register'
import  Login  from './pages/login/Login'
import  Home  from './pages/home/Home'
import  Found  from './pages/notFound/notFound'
import { AdminLayout, NavLayout, PartnerLayout } from './components/layout/Layout'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
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
import LoginForm from './components/forms/loginForm'
import PartnerProfile from './pages/profile/PartnerProfile'
import AdminStat from './pages/Dashboard/admin/statistics'
import AdminActivities from './pages/Dashboard/admin/allActivities'
import AdminPartners from './pages/Dashboard/admin/allPartners'
import AdminMembers from './pages/Dashboard/admin/allMembers'
import CalendarPage from './pages/calendar/calendar'
import AdminProfile from './pages/Dashboard/admin/profile'
import AdminCategories from './pages/Dashboard/admin/categories'
import AdminReviews from './pages/Dashboard/admin/reviews'





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
          path : '/calendar',
          element : <CalendarPage/>
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
          element : 
          <PrivateRole role="member">
          <Profile/>
          </PrivateRole>
          
        },

        
        { 
          path : '/dashboard/partner/activities',
          element : 
          
          <Partner/>
        },

        
        {
          path : '/partner/signup',
          element : <PublicRoute>
          <Register/>
          </PublicRoute>
        },

        {
          path : '/partner/login',
          element : 
          <PublicRoute>
          <Login/>
          </PublicRoute>
        },
        
       
      ]
    },
  
    
   
    {
      path : '/dashboard',
        element : <PartnerLayout/>,
      children: [

    {
      path : '/dashboard/partner',
     element : 
     
     <DashboardPartner/>
     
   },
   {
    path : '/dashboard/partner/create',
    element : <CreateActivity/>
  },

  {
    path : '/dashboard/partner/profile',
    element : <PartnerProfile/>
  },
  

  ]
  },

  {
    path: '/dashboard/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/dashboard/admin/stat',
        element: <AdminStat />
      },

      {
          
        path : '/dashboard/admin/activities',
        element : 
        // <PrivateRole role="admin">
        <AdminActivities/>
        // </PrivateRole>

      },

      {
          
        path : '/dashboard/admin/partners',
        element : 
        // <PrivateRole role="admin">
        <AdminPartners/>
        // </PrivateRole>

      },

      {
          
        path : '/dashboard/admin/members',
        element : 
        // <PrivateRole role="admin">
        <AdminMembers/>
        // </PrivateRole>

      },

      {
          
        path : '/dashboard/admin/categories',
        element : 
        // <PrivateRole role="admin">
        <AdminCategories/>
        // </PrivateRole>

      },

      {
          
        path : '/dashboard/admin/reviews',
        element : 
        // <PrivateRole role="admin">
        <AdminReviews/>
        // </PrivateRole>

      },

      {
          
        path : '/dashboard/admin/profile',
        element : 
        // <PrivateRole role="admin">
        <AdminProfile/>
        // </PrivateRole>

      }



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
