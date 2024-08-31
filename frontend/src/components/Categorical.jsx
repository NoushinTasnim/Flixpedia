import React, { useEffect, useRef, useState } from 'react'
import CategoricalBox from './CategoricalBox';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Categorical = ({category}) => {
    useEffect(()=>{
      Aos.init();
    },[])

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
          behavior: 'smooth'
        });
      }
    };
    const scrollRight = () => {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth'
      })
    };
    return (
    <div 
      data-aos="fade-up"
      className='relative text-white px-5 md:px-20' 
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1 className='mt-16 mb-0 text-lg lg:text-2xl font-bold'>
        {formattedCategoryName + formattedContentType}
      </h1>
      <div className='flex space-x-4 sm:space-x-8 overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef} >
        {content.map((item)=> <CategoricalBox key={item.id} item={item}/>)}        
      </div>
      {showArrows && (
        <div>
          <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' onClick={scrollLeft}>
            <FaAngleLeft/>
          </button>
          <button 
          className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
          onClick={scrollRight}>
            <FaAngleRight/>
          </button>
        </div>
      )}
    </div>
  )
}

export default Categorical
