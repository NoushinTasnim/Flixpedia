import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/top`);
            setContent(res.data.content.slice(0, 10)); 
            
        };
        getContent();
    }, [contentType]);
    
    console.log(content);
    return (
        <div className='trending-box'>
            <h1>Trending Today</h1>
            <div className='trending'>
                {content.map((trend, index) => (
                    <Trend key={index} img1={trendingData[index].img1} item={trend} />
                ))}
            </div>
        </div>
    );
};

export default Trending;
