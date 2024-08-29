import React, { useState } from 'react'
import './trend.css'
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Trend = ({ img1, item }) => {
    const navigate = useNavigate();
    const {smallImgLoad, setSmallImgLoad} = useState(true);
    
    const handleClick = (e) => {
      e.preventDefault();
      navigate('/details/' + item.id);
    };
    return (
      <div className='flex min-w-[150px] xs:min-w-[200px] sm:min-w-[300px] items-center rounded-lg'>
          <img className='h-[100px] xs:h-[150px] sm:h-[250px] w-[80px]' src={img1}/>
            {smallImgLoad && (
              <div className='absolute top-0 left-0 w-full h-full bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
            )}
          <img 
            onClick={handleClick} 
            className='h-[150px] w-[100px] xs:h-[200px] xs:w-[140px] sm:h-[250px] sm:w-[175px] rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110' src={SMALL_IMG_BASE_URL + item.poster_path}
            onLoad={()=>{
              setSmallImgLoad(false)
            }}
          />
      </div>
    )
  }

export default Trend
