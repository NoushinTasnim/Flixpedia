import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='relative'>
        <div className='px-8 bg-[#101010aa] z-10 flex flex-col items-end justify-center h-[100vh]'>
            <h1 className='font-orbitron text-9xl font-bold text-white mb-8 text-right'>404</h1>
            <h3 className='text-white text-lg font-light text-right'>
                The cat is not lost, you are.
            </h3>
            <h3 className='text-white text-lg font-light text-right'>
                We are trying to solve this issue.
            </h3>
            <h3 className='text-white text-lg font-light mt-4 text-right'>
                Meanwhile you can check our homepage for some cool stuffs.
            </h3>
            <Link to='/dashboard' className='bg-white text-black py-2 px-4 m-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
                <h3>Home Page</h3>
            </Link>
        </div>
        <div className='absolute inset-0 -z-10'>
            <img 
                className='w-full h-full object-cover'
                src='https://www.humanesociety.org/sites/default/files/2022-12/winter-cat-260203_0.jpg'
                alt="Background"
            />
        </div>
    </div>
  )
}

export default NotFound
