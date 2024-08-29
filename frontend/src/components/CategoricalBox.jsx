import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Categorical.css';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const CategoricalBox = ({ item }) => {
  const navigate = useNavigate();
  const [smallImgLoad, setSmallImgLoad] = useState(true);
  
  const handleImgClick = (e) => {
      e.preventDefault();
      navigate('/details/' + item.id);
  };
  return (
    <div className='min-w-[100px] xs:min-w-[140px] sm:min-w-[200px] relative group'>
      <div className="rounded-lg overflow-hidden cursor-pointer">
        {smallImgLoad && (
          <div className='absolute top-0 left-0 w-full h-full bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
        )}
        <img 
          onClick={handleImgClick}
          src={`${SMALL_IMG_BASE_URL}${item?.poster_path}`} 
          alt={item?.title ? item?.title : item?.name} 
          onLoad={()=>{
            setSmallImgLoad(false)
          }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-12" 
        />
    </div>
    </div>
  );
};

CategoricalBox.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CategoricalBox;
