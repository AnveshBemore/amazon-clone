import { Link } from 'react-router-dom'
import React from 'react'
import './Login.css';
import { useEffect, useState } from "react";

function Login() {
    const [email,setEmail ]=useState('');
    const [password,setPassword]=useState('');

    const signIn = e=>{
        e.preventDefault();
    }
    const register = e=>{
        e.preventDefault();
    }
    

    return (
        <div className='login'>
           <Link to='/'>
                <img 
                className="login__logo"
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png'/>
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange=
                    {e=>setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password}
                    onChange={e=>setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn}
                    className='login__SignInButton'>Sign In</button>
                </form>
                <p>
             By signing in u accept my policy.            
                </p>
                <button onClick={register}
                className='login__registerButton'>Create your ur Account</button>
                    
            </div>
        </div>
    )
}

export default Login
