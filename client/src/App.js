// import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Profile from './pages/profile';
import Activities from './pages/activities';


function App() {

  const router = createBrowserRouter ([
    {
      path : '/',
      element : <div>Home Page</div>
    },
    
    {
      path : '/login',
      element : <Login/>
    },

    {
      path : '/signup',
      element : <Signup/>
    },

    {
      path : '/home',
      element : <Home/>
    },

    {
      path : '/profile',
      element : <Profile/>
    },

    {
      path : '/activities',
      element : <Activities/>
    }
  ])

  return (
    <>
      <RouterProvider router ={router}/>
    </>
  );
}

export default App;
