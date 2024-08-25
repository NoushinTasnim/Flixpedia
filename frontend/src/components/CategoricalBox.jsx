import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Categorical.css';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';

const CategoricalBox = ({ item }) => {
  return (
    <div
      className="video-container1">
      <div className="video-overlay1">
        <img 
          src={`${SMALL_IMG_BASE_URL}${item?.poster_path}`} 
          alt="Video Title" 
          className="video-title1" 
        />
      </div>
      <div>
      </div>
    </div>
  );
};

CategoricalBox.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CategoricalBox;
