import React, { useEffect, useRef, useState } from 'react'
import Trend from '../components/Trend';
import './Trending.css';
import one from '../assets/1.svg'
import two from '../assets/2.svg'
import three from '../assets/3.svg'
import four from '../assets/4.svg'
import five from '../assets/5.svg'
import six from '../assets/6.svg'
import seven from '../assets/7.svg'
import eight from '../assets/8.svg'
import nine from '../assets/9.svg'
import ten from '../assets/10.svg'
import { useContentStore } from '../store/content';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import axios from 'axios';

const trendingData = [
    { img1: one },
    { img1: two },
    { img1: three },
    { img1: four },
    { img1: five },
    { img1: six },
    { img1: seven },
    { img1: eight },
    { img1: nine },
    { img1: ten },
];

const Trending = () => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/top`);
            setContent(res.data.content.slice(0, 10)); 
            
        };
        getContent();
    }, [contentType]);

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
    
    console.log(content);
    return (
        <div className='relative text-white px-5 md:px-20'
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}>
            <h1 className='mt-20 mb-0 text-2xl font-bold'>
                Trending Today
            </h1>
            <div className='flex space-x-8 overflow-x-scroll mt-8 scrollbar-hide' ref={sliderRef}>
                {content.map((trend, index) => (
                    <Trend key={index} img1={trendingData[index].img1} item={trend} />
                ))}
            </div>
        {showArrows && (
            <div>
            <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-black z-10' onClick={scrollLeft}>
                <FaAngleLeft/>
            </button>
            <button 
            className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-black z-10' 
            onClick={scrollRight}>
                <FaAngleRight/>
            </button>
            </div>
        )}
        </div>
    );
};

export default Trending;
