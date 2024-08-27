import React, { Component } from 'react'
import './trend.css'
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Trend = ({ img1, item }) => {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
      console.log('here');
        e.preventDefault();
        console.log(item.id);
        navigate('/details/' + item.id);
    };
    return (
            <div className='flex min-w-[300px] items-center mr-8 rounded-lg'>
                <img className='h-[250px]' src={img1}/>
                <img onClick={handleClick} className='h-[250px] rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110' src={SMALL_IMG_BASE_URL + item.poster_path}/>
            </div>
      )
  }

export default Trend
