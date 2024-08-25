import React, { Component } from 'react'
import './trend.css'
import PropTypes from 'prop-types';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';

const Trend = ({ img1, item }) => {
  console.log(item);
    return (
            <div className='trend'>
                <img className='rank' src={img1}/>
                <img className='image' src={SMALL_IMG_BASE_URL + item.poster_path}/>
            </div>
      )
  }

export default Trend
