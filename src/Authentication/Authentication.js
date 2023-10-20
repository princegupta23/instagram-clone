import React, {useState, useEffect} from 'react'
import "./Authentication.css"
import Login from './Login'
import Signup from './Signup'



function Authentication() {


const[active, setActive]=useState("login");
const handleChange = () => {
     setActive(active === "login" ? "signup" : "login")
}

  return (

    <div className='authentication'>
        <div className="authentication__left">
            <img
            src="https://png.pngtree.com/element_our/md/20180522/md_5b038915df006.jpg"
            alt=""
            />
        </div>
        <div className="authentication__right">

        {active === 'login' ? (<Login/>): (<Signup/>)}
        
                    <div className="auth__more">
            
                <span>
                {active === "login" ? (
                    <>Don't have an account ? <button onClick={handleChange}>Sign Up</button></>
                    ) : (
                        <>Have an account ? <button onClick={handleChange}>Login</button></>
                        )}
                    
                </span>
            </div>

           
        </div>
    </div>
  )
}

export default Authentication