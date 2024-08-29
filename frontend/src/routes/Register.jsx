import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.svg'
import '../index.css'
import { useAuthStore } from '../store/authUser'
import BackDrop from '../assets/backdrop.png'

const Register = () => {
    const {searchParams} = new URL(document.location);
    const emailValue = searchParams.get('email');

    const [email, setEmail] = useState(emailValue || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {signUp} = useAuthStore();

    const handleSignUp = (e) => {
        e.preventDefault();
        signUp({
            username,
            email,
            password
        })
    };

  return (
    <div className='w-full h-full'>
        <div className='w-full h-full absolute top-0 left-0 object-cover'>
            <img className='w-full h-full object-cover' src={BackDrop}/>
        </div>
        <div className='flex flex-col space-y-8 z-10 justify-center align-middle'>
            <Link to='/' className='absolute z-20 top-12 left-16 w-[150px] cursor-pointer'>
                <img src={Logo}/>
            </Link>
            <div className='w-[100] h-[100vh] items-center mx-8 my-auto flex flex-col z-10 justify-center space-y-4 py-16 px-8 rounded-lg'>
                <h1 className='text-2xl mb-4 font-semibold'>Sign Up</h1>
                <form className='w-4/5 flex flex-col space-y-4 justify-between sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4' onSubmit={handleSignUp}>
                <input 
                            type="text" 
                            placeholder="Username" 
                            name="username" 
                            className='w-full text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            name="email" 
                            className='w-full text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className='w-full text-left bg-[#63636340] border rounded px-4 py-2 text-white text-sm'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    <button className='btn'>Sign Up</button>
                </form>
                <div className='flex items-baseline justify-center mt-8'>
                    <h4 className='text-[#ffffffcc] pr-2 font-extralight text-sm'>Already have an account?</h4>
                    <Link to='/login'  className='text-white font-light text-sm cursor-pointer pr-2 hover:underline'> Sign in</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
