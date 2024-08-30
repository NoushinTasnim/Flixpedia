import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'
import { useAuthStore } from '../store/authUser'
import BackDrop from '../assets/backdrop.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuthStore();

    const handleLogIn = (e) => {
        e.preventDefault();
        login({
            email,
            password
        })
    };

  return (
    <div className='w-full h-screen relative px-8'>
        <div className='w-full h-full absolute top-0 left-0'>
            <img 
                className='w-full h-full object-cover'
                src={BackDrop}
            />
        </div>
        <div className='flex flex-col space-y-8 z-10 justify-center items-center h-full'>
            <Link to='/' className='absolute z-20 top-8 sm:top-12 left-4 sm:left-16 w-[80px] sm:w-[150px] cursor-pointer'>
                <img src={Logo}/>
            </Link>
            <div className='w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center z-10 space-y-4 py-16 rounded-lg bg-black bg-opacity-50'>
                <h1 className='text-2xl mb-4 font-semibold'>Sign In</h1>
                <form className='w-full flex flex-col space-y-4 px-4 sm:px-8'>
                    <input 
                        type="email" 
                        placeholder="Email address" 
                        name="email" 
                        className='w-full text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        className='w-full text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='btn' onClick={handleLogIn}>Sign In</button>
                </form>
                <div className='flex items-baseline justify-center mt-8'>
                    <h4 className='text-[#ffffffcc] pr-2 font-extralight text-sm'>New to Flixpedia?</h4>
                    <Link to='/register' className='text-white font-light text-sm cursor-pointer pr-2 hover:underline'> Sign Up </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
