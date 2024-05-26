import React, { useState } from 'react'
import axios from 'axios'
function Login() {
  const [loginForm,setLoginForm] = useState({
     empcode : '',
     password : ''
  });
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

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(loginForm.empcode === ''){
        setMessage('Please specify empcode. ');
    }else if(loginForm.password === ''){
        setMessage('Please specify password. ');
    }

    // login api call
    try{
        const response =  axios.post('',loginForm);
        localStorage.setItem('token',response.data.token);
        setMessage('Login successful. ')
    }catch(err){
        setMessage('Login failed. ')
    }
    clearFields();
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
                 <input name='empcode' type='text' value={loginForm.empcode} onChange={handleChange} placeholder='empCode' />
            </div>
            <div>
                <input name='password' type='password' value={loginForm.password} onChange={handleChange} placeholder='password' />
            </div>
            <button onClick={handleSubmit}>Login</button>
        </form>
    </div>
  )
}

export default Login;