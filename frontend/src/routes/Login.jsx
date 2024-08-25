import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'
import { useAuthStore } from '../store/authUser'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuthStore();

    const handleLogIn = (e) => {
        e.preventDefault();
        console.log(email, password);
        login({
            email,
            password
        })
    };

  return (
    <div className='hero2'>
        <div className='mask'>
            <img src='https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg'/>
        </div>
        <div>
            <Link to='/' className='logo' >
                <img src={Logo}/>
            </Link>
        </div>
        <div className='header-box'>
            <h1>Sign In</h1>
            <form className='inputs'>
                <input 
                        type="email" 
                        placeholder="Email address" 
                        name="email" 
                        className='email-input'
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        className='email-input'
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                />
                <button className='btn' onClick={handleLogIn}>Sign In</button>
            </form>
            <div className='horizontal-container'>
            <h4>New to Flixpedia?</h4>
            <Link to='/register' className='sign-btn'> Sign Up now</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
