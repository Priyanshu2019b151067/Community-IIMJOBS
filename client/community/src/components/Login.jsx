import React, { useContext, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginForm,setLoginForm] = useState({
     empCode : '',
     password : ''
  });
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const [message,setMessage] = useState('');
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setLoginForm((prevValue)=>(
        {
            ...prevValue,
            [name] : value
        }
    ))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(loginForm.empCode === ''){
        setMessage('Please specify empcode. ');
    }else if(loginForm.password === ''){
        setMessage('Please specify password. ');
    }

    // login api call
    try{
        const data = {
            "empCode" : loginForm.empCode,
            "password" : loginForm.password
        }
        const response = await axios.post('http://localhost:3000/user/login',data,{ withCredentials: true });
        if(response.status == 200){
           setUser(loginForm.empCode);
            navigate('/');
        }
       //Cookies.set('jwt_token',response.data.token);
        setMessage('Login successful. ')
    }catch(err){
        setMessage('Login failed. ')
    }
    //clearFields();
  }
  return (
    <div>
        <h1>Login</h1>

        <p>Enter your login details please.</p>
        <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
            <div>
                {message}
            </div>
            <div>
                 <input name='empCode' type='text' value={loginForm.empCode} onChange={handleChange} placeholder='empCode' />
            </div>
            <div>
                <input name='password' type='password' value={loginForm.password} onChange={handleChange} placeholder='password' />
            </div>
            <button onClick={handleSubmit}>Login</button>
            <Link to={'/signup'}>Create Account</Link>
        </form>
    </div>
  )
}

export default Login;