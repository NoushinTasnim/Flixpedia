import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Categorical.css';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const CategoricalBox = ({ item }) => {
  const navigate = useNavigate();
  
  const handleImgClick = (e) => {
    console.log(item.id);
      e.preventDefault();
      navigate('/details/' + item.id);
  };
  return (
    <div className='min-w-[200px] relative group'>
      <div className="rounded-lg overflow-hidden cursor-pointer">
        <img 
          onClick={handleImgClick}
          src={`${SMALL_IMG_BASE_URL}${item?.poster_path}`} 
          alt={item?.title ? item?.title : item?.name} 
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
