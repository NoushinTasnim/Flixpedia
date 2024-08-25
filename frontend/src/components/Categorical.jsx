import React, { useEffect, useRef, useState } from 'react'
import CategoricalBox from './CategoricalBox';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Categorical = ({category}) => {
    const {contentType} = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    const formattedCategoryName = 
      category.replaceAll('_'," ")[0].toUpperCase()+ category.replaceAll('_'," ").slice(1);
    
      const formattedContentType = contentType === 'movie' ? " Movies" : " TV Shows";
    
      useEffect(() => {
      const getContent = async () => {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.content);
      }
      getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
      if(sliderRef.current){
        sliderRef.current.scrollBy({
          left: -sliderRef.current.offsetWidth,
          behaviour: 'smooth'
        });
      }
    };
    const scrollRight = () => {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth'
      })
    };
    return (
    <div 
      className='categorical-box' 
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1>{formattedCategoryName + formattedContentType}</h1>
      <div className='categorical' ref={sliderRef} >
        {content.map((item)=> <CategoricalBox key={item.id} item={item}/>)}        
      </div>
      {showArrows && (
        <div className='arrows'>
          <button onClick={scrollLeft}>
            <FaAngleLeft/>
          </button>
          <button onClick={scrollRight}>
            <FaAngleRight/>
          </button>
        </div>
      )}
    </div>
  )
}

export default Categorical
