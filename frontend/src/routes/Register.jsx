import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'
import { useAuthStore } from '../store/authUser'

const Register = () => {
    const {searchParams} = new URL(document.location);
    const emailValue = searchParams.get('email');

    const [email, setEmail] = useState(emailValue || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {signUp} = useAuthStore();

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(username, email, password);
        signUp({
            username,
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
            <h1>Sign Up</h1>
            <form className='inputs' onSubmit={handleSignUp}>
            <input 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        className='email-input'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        name="email" 
                        className='email-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        className='email-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                <button className='btn'>Sign Up</button>
            </form>
            <div className='horizontal-container'>
            <h4>Already have an account?</h4>
            <Link to='/login' className='sign-btn'> Sign in now</Link>
            </div>
        </div>
    </div>
  )
}

export default Register
