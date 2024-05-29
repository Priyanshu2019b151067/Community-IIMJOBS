import './App.css'
import Login from './components/Login'
import Navbar from './components/NavbarComponent'
import Signup from './components/Signup'
import HomePage from './pages/HomePage';
import { Outlet } from 'react-router-dom';
import {UserProvider} from  '../context/UserContext'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Profile from './components/Profile'
import axios from 'axios';
import Cookies from 'js-cookie';


//set up axios interceptor
// axios.interceptors.request.use(
//   (config) =>{
//     const token = Cookies.get('jwt');
//     if(token){
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
//   },
//   (error) =>{
//     return Promise.reject(error);
//   }
// )



const router = createBrowserRouter([
  {
    path: '/',
    element:
    (
     <>
     <Navbar/>
     <Outlet/>
     
     </> 
    ),
    children: [
      { path: '', element: <HomePage /> }, 
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },

    ],
  },
]);
function App() {

  return (
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
  )
}

export default App
