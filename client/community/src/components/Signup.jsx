import React, { useState } from 'react'
import axios from 'axios';
function Signup() {
 const [signupForm,setSignupForm] = useState({
    empCode : '',
    email : '',
    password : '',
    repeatPassword : ''
  });
  const [message,setMessage] = useState('');
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setSignupForm((prevValue)=>({
      ...prevValue,
      [name] : value
    }))
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(signupForm.password !== signupForm.repeatPassword){
        setMessage('Password donot match.');
    }
    setMessage('');
    const data = {'empCode':signupForm.empCode,'email':signupForm.email,'password':signupForm.password}
    const response = await axios.post('http://localhost:3000/user/signup',data);
    console.log(response);
  } 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='empCode' value={signupForm.empCode} onChange={handleChange} />
        </div>
        <div>
          <input type='email' name='email' value={signupForm.email} onChange={handleChange} />
        </div>
        <div>
          <input type='password' name='password' value={signupForm.password} onChange={handleChange} />
        </div>
        <div>
          <input type='password' name='repeatPassword' value={signupForm.repeatPassword} onChange={handleChange} />
        </div>
        <button onSubmit={handleSubmit}>Signup</button>
      </form>
    </div>
  )
}

export default Signup