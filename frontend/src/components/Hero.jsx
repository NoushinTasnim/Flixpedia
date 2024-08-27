import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import React from 'react';
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeHigh } from 'react-icons/fa6';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const Hero = () => {
  const {trendingContent} = useGetTrendingContent();

  return (
    <div className='hero1'>
      <div className='mask1'>
      <div className="video-container">
        <div>
          <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}/>
        </div>
        </div>
      </div>
      
      <div className='txt'>
        <h1>{trendingContent ? (trendingContent.title ? trendingContent.title : trendingContent.name ) : "hoo"}</h1>
        <h4
          className='pt-4 pb-2 text-xs font-medium'
        >
          {trendingContent?.release_date?.split('-')[0] || trendingContent?.first_air_date?.split('-')[0]} | {trendingContent?.adult ? '18+' : 'PG-13'}
        </h4>
        <p
          className='py-2 max-w-sm text-sm font-extralight'
        >
          {trendingContent ? (trendingContent.overview.length > 300) ? trendingContent.overview.slice(0,300) + "..." : trendingContent.overview : "ahsahs"}
        </p>
        <div className='btns'>
          <Link to='' className='btn'>Play</Link>
          <Link to='' className='btn-light'>More Info</Link>
        </div>
      </div>      
    </div>
  );
}

export default Hero;
