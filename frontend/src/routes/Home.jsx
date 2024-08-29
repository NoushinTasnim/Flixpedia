import React, { useState } from 'react'
import {Form, Link, useNavigate} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'
import BackDrop from '../assets/backdrop.png'

const Home = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/register?email=' + email);
    };

    return (
        <div className='hero'>
            <img className='h-full w-full object-cover' src={BackDrop}/>
            <div className='absolute z-20 top-12 flex w-full justify-between items-center px-4 xs:px-16'>
                <Link to='/' className='w-[100px] xs:w-[150px] cursor-pointer'>
                    <img src={Logo}/>
                </Link>
                <Link to='/login' className='cursor-pointer bg-red-600 text-center content-center rounded-lg px-8 py-2 hover:bg-red-800'>
                    <h3 className='text-xs font-light'>Sign In</h3>
                </Link>
            </div>
            <div className='w-full flex flex-col z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center justify-center items-center px-8 py-4 sm:px-16  sm:w-3/4 xl:w-2/4'>
                <h1 className='font-extralight text-4xl lg:text-7xl sm:text-5x1'>
                    Unlimited movies, TV shows, and more
                </h1>
                <h4 className='font-extralight text-sm mt-4 text-gray-300'>
                    Ready to discover? Enter your email.
                </h4>
                <form className='flex space-x-1 w-full py-4 items-center justify-center md:w-4/5' onSubmit={handleFormSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-2/3 text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                        required 
                    />
                    <button className='w-1/3 bg-red-600 px-4 py-2.5 border border-red-600 rounded font-light text-white text-xs sm:py-3'>
                        <h3 className='text-xs'>Get Started</h3>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Home
