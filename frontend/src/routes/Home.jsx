import React, { useState } from 'react'
import {Form, Link, useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'

const Home = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/register?email=' + email);
    };

    return (
        <div className='hero'>
            <div className='mask'>
                <img src='https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg'/>
            </div>
            <div>
                <Link to='/' className='logo' >
                    <img src={Logo}/>
                </Link>
                <Link to='/login' className='btn'>
                    <h3>Sign In</h3>
                </Link>
            </div>
            <div className='header'>
                <h1>
                    Unlimited movies, TV shows, and more
                </h1>
                <h4>
                Ready to watch? Enter your email.
                </h4>
                <form className='input-box' onSubmit={handleFormSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='email-input'
                        required 
                    />
                    <button className='go-btn'>
                        <h3>Get Started ></h3>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Home
