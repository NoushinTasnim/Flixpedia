import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo2.svg';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Navbar = () => {
    useEffect(()=>{
        Aos.init();
      },[])
    const {user, logOut} = useAuthStore();
    const {setContentType} = useContentStore();
    const [click, setclick]= useState(false);
    const handleClick = () => setclick(!click);

    const [color, setColor] = useState(false);
    const changeColor = ()=>{
        if(window.scrollY >=100){
        setColor(true);
        }
        else{
        setColor(false);
        }
    };

    window.addEventListener("scroll", changeColor);

    return (
        <div
            data-aos="fade-down" 
            className={color ?
             "w-full justify-between items-center px-4 sm:px-8 py-4 fixed h-[60px] z-40 flex bg-[#101010] transition-opacity duration-500-" : 
             "w-full justify-between items-center px-4 sm:px-8 py-4 fixed h-[60px] z-40 flex"
            }
        >
            <div className='flex justify-center items-center sm:space-x-16'>
                <Link to='/'>
                    <img src={Logo} className='w-[100px] sm:w-[150px]'/>
                </Link>
                    <ul className='hidden sm:flex tracking-normal font-light'>
                        <li className='px-4 text-[#e7e7e7] hover:text-[#ffffff9b]'>
                            <Link 
                                to='/Dashboard' 
                                onClick={()=>setContentType('movie')}
                                className=' text-[#e7e7e7] hover:text-[#ffffff9b]'
                            >
                                Movies
                            </Link>
                        </li>
                        <li className='px-4 text-[#e7e7e7] hover:text-[#ffffff9b]'>
                            <Link 
                                to='/Dashboard' 
                                onClick={()=>setContentType('tv')}
                                className=' text-[#e7e7e7] hover:text-[#ffffff9b]'
                            >
                                Series
                            </Link>
                        </li>
                    </ul>
            </div>
            <div className='flex justify-evenly space-x-4 sm:space-x-8 items-center'>
                <Link to='/search' className='text-white'>
                    <FaSearch size={24}></FaSearch>
                </Link>
                <img src={user.image} className='h-8 rounded'/>
                <div className='hidden sm:flex text-white cursor-pointer'>
                    <FaSignOutAlt onClick={logOut} size={24}></FaSignOutAlt>
                </div>
                <div className="sm:hidden z-20" onClick={handleClick}>
                    {click ? 
                    <FaTimes size={20} style={{color:"#fff"}}/>
                    :
                    <FaBars size={20} style={{color:"#fff"}}/>
                    }
                </div>
            </div>
            {click && (
                <ul className='absolute w-full z-10 top-16 left-0 space-y-4 bg-[#101010cc] sm:hidden flex-col text-center justify-center m-auto tracking-normal font-light'>
                <li className='py-2 w-full hover:bg-[#ffffff11]'>
                    <Link 
                        to='/Dashboard' 
                        onClick={()=>{
                            setContentType('tv');
                            setclick(false);
                        }}
                        className=' text-[#e7e7e7] hover:text-[#ffffff]'
                    >
                        Series
                    </Link>
                </li>
                <li className='py-2 w-full hover:bg-[#ffffff11]'>
                    <Link 
                        to='/Dashboard' 
                        onClick={()=>{
                            setContentType('movie');
                            setclick(false);
                        }}
                        className=' text-[#e7e7e7] hover:text-[#ffffff]'
                    >
                        Movies
                    </Link>
                </li>
                <li className='py-2 w-full hover:bg-[#ffffff11]'>
                    <Link 
                        onClick={logOut}
                        className=' text-[#e7e7e7] hover:text-[#ffffff]'
                    >
                        Log Out
                    </Link>
                </li>
            </ul>)}
        </div>
    )
}

export default Navbar
