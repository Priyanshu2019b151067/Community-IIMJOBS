import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Profile from './components/Profile.jsx'
import { userProvider } from '../context/UserContext.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element:  <userProvider>
      <Navbar/>
      <App/></userProvider>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },

    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
      <RouterProvider  router={router} />
)
