import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import HomePage from './pages/HomePage';
import { Outlet } from 'react-router-dom';
import {userProvider} from '../context/UserContext'
function App() {

  return (
      <>
        
        <Outlet/>
      </>
  )
}

export default App
