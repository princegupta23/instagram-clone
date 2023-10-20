import React, { useState, useEffect } from 'react'
import "./Signup.css"
import { db, auth } from '../firebase';

function Signup() {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [username, setUsername]= useState("");
  const [user,setUser] = useState(null);


  const signUp = (event) =>{
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    // setOpen(false);
  }
 

  return (

    
    <div className='signup'>
        <img
        
        src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration.png"
        alt=""
        />
         <input
        placeholder='username'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        
        <button type='submit' onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default Signup