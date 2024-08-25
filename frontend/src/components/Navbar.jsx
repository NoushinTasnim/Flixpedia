import React from 'react';
import Logo from '../assets/logo.svg';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
    const {user, logOut} = useAuthStore();
    console.log(user.image);
    const {setContentType} = useContentStore();

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <Link to='/'>
                    <img src={Logo} style={{ width: '100px'}} />
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
                <img src={user.image} height={'24px'}/>
                <button>
                    <FaSignOutAlt size={24}></FaSignOutAlt>
                </button>
            </div>
        </div>
    )
}

export default Navbar
