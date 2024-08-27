import React, { useState } from 'react';
import Logo from '../assets/logo2.svg';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
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
        <div className={color ? "navbar navbar-bg" : "navbar"}>
            <div className='navbar-left'>
                <Link to='/'>
                    <img src={Logo} style={{ width: '150px'}} />
                </Link>
                    <ul className='nav-menu'>
                        <li>
                            <Link to=''>Home</Link>
                        </li>
                        <li>
                            <Link to='' onClick={()=>setContentType('tv')}>Series</Link>
                        </li>
                        <li>
                            <Link to='' onClick={()=>setContentType('movie')}>Movies</Link>
                        </li>
                    </ul>
            </div>
            <div className='navbar-right'>
                <button>
                    <FaSearch size={24}></FaSearch>
                </button>
                <img src={user.image} className='h-8'/>
                <button>
                    <FaSignOutAlt size={24}></FaSignOutAlt>
                </button>
            </div>
        </div>
    )
}

export default Navbar
