import React, { useState } from 'react'
import "./Login.css"

function Login() {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  
  return (
    <div className='login'>
       <img
        
        src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png"
        alt=""
        />
        
        <input
        placeholder='email'
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        placeholder='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
    </div>
  )
}

export default Login