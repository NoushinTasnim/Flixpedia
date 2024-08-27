import React, { useEffect, useRef, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { useContentStore } from '../store/content';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import CategoricalBox from '../components/CategoricalBox';
import man from '../assets/images.png';
import countries from '../utils/countries'

const Details = () => {
    const {id} = useParams();
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const [cast, setCast] = useState([]);
    const {contentType} = useContentStore();
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);
    const sliderRef3 = useRef(null);

    const navigate = useNavigate();

    const onWatchClick = (e) => {
        console.log('here');
          e.preventDefault();
          console.log(id);
          navigate('/watch-providers/' + id);
      };

    const onReviewClick = (e) => {
          console.log('here');
            e.preventDefault();
            console.log(id);
            navigate('/reviews/' + id);
        };

    const scrollLeft = (sliderRef) => {
        if(sliderRef.current){
          sliderRef.current.scrollBy({
            left: -sliderRef.current.offsetWidth,
            behavior: 'smooth'
          });
        }
      };
      const scrollRight = (sliderRef) => {
        sliderRef.current.scrollBy({
          left: sliderRef.current.offsetWidth,
          behavior: 'smooth'
        })
      };

    useEffect(()=> {
        const getTrailers = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                
                setTrailers(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setTrailers([]);
                }
            }
        };

        getTrailers();
    },[contentType, id]);

    useEffect(()=> {
        const getDetails = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                
                setContent(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setContent([]);
                }
            }
        };

        getDetails();
    },[contentType, id]);

    useEffect(()=> {
        const getSimilarContent = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                
                setSimilarContent(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setSimilarContent([]);
                }
            }
        };

        getSimilarContent();
    },[contentType, id]);

    useEffect(()=> {
        const getCast = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/cast`);
                
                setCast(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setCast([]);
                }
            }
        };

        getCast();
    },[contentType, id]);

  return (
    <div>
        <div className='w-full flex flex-col space-y-10'>
            <div className='w-full h-[50vh] rounded-lg justify-center top-0'>
                <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/50 after:via-black/40 after:to-[#101010] after:z-10">
                <div className="relative w-full h-[50vh] overflow-hidden z-1">
                    <div>
                        <img src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path}/>
                    </div>
                </div>
            </div>
            </div>
            <div className='flex p-12 items-top'>
                <img 
                    className='h-[40vh] rounded-lg'
                    src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
                />
                <div className='relative pl-8 z-10 space-y-4'>
                    <h1 className='text-4xl font-bold'>{content?.title ? content.title : content.name}</h1>
                    <p>
                        {contentType === 'movie' && (
                            <>
                                Released: {content?.release_date 
                                ? new Date(content.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                                : "N/A "} | Runtime: {content?.runtime ? `${content.runtime} mins ` : "Unknown "} 
                            </>
                        )}
                        {contentType === 'tv' && (
                            <>
                                First Aired: {content?.first_air_date 
                                ? new Date(content.first_air_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                                : "N/A "} 
                                | Last Aired: {content?.last_air_date 
                                ? new Date(content.last_air_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                                : "Unknown"} | Runtime: {content?.episode_run_time && content.episode_run_time.length > 0 
                                    ? `${content.episode_run_time[0]} mins` 
                                    : "Unknown "}
                                
                            </>
                        )}
                        
                        | {content?.adult ? '18+' : 'PG-13'}
                    </p>
                    <p className='max-w-lg font-extralight'>{content?.overview}</p>
                    {(content?.genres?.length > 0) && (
                        <div className='flex flex-nowrap space-x-2 w-full items-center'>
                        {content?.genres?.map((genre) => (
                            <div key={genre.id} className='border border-white rounded-xl py-1 px-4'>
                                <h3 className='text-white font-extralight text-sm' >{genre.name}</h3>
                            </div>
                        ))}
                        </div>
                    )}
                    <div className='flex space-x-8 text-white font-light text-sm'>
                        <h3 className=''>
                            {content?.number_of_seasons ? `Total Seasons: ${content.number_of_seasons}` : ''}
                        </h3>
                        <h3 className=''>
                            {content?.number_of_seasons ? `Total Episodes: ${content.number_of_episodes}` : ''}
                        </h3>
                    </div>
                </div>
            </div>
            {cast?.length > 0 && (
                <div  
                    className='px-12 relative' 
                    onMouseEnter={() => setShowArrows(true)}
                    onMouseLeave={() => setShowArrows(false)}
                >
                    <h1 className='text-2xl font-bold mb-4 capitalize'>Casts</h1>
                    <div className='flex space-x-10 w-full items-center overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef1}>
                        {cast?.map((item, id) => (
                            <div key={id} className='flex flex-col items-center'>
                                <div className='w-[120px] h-[100px]relative group rounded-full overflow-hidden hover:scale-110 hover:my-4'>
                                    <img 
                                        src={item?.profile_path ? SMALL_IMG_BASE_URL + item?.profile_path : man}
                                        alt={item.name} 
                                        className='w-full h-full object-cover' 
                                    />

                                </div>
                            <p className='text-white text-center text-xs font-thin mt-4'>{item.character}</p>
                            <p className='text-white text-center text-sm font-medium mt-2'>{item.name}</p>
                        </div>                    
                        ))}
                    </div>
                    {showArrows && (cast.length>8) && (
                        <div>
                        <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                        onClick={() => scrollLeft(sliderRef1)}>
                            <FaAngleLeft/>
                        </button>
                        <button 
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                        onClick={() => scrollRight(sliderRef1)}>
                            <FaAngleRight/>
                        </button>
                        </div>
                    )}
                </div>
            )}
            {similarContent.length > 0 && (
            <div 
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)} 
                className='px-12 relative'
            >
                <h1 className='mt-8 text-2xl font-bold mb-4 capitalize'>Recommendations</h1>
                <div className='flex space-x-8 w-full items-center overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef2}>
                    {similarContent?.map((simContent, id) => (
                        <CategoricalBox key={id} item={simContent}/>
                    ))}
                </div>
                {showArrows && (
                    <div>
                    <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                    onClick={() => scrollLeft(sliderRef2)}>
                        <FaAngleLeft/>
                    </button>
                    <button 
                    className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                    onClick={() => scrollRight(sliderRef2)}>
                        <FaAngleRight/>
                    </button>
                    </div>
                )}
            </div>
            )}
            {trailers.length > 0 && (
            <div 
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)} 
                className='px-12 relative mt-32'
            >
                <h1 className='mt-10 mb-0 text-2xl font-bold'>Videos</h1>
                <div className='flex space-x-4  overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef3}>
                    {trailers.map((trailer, index) => (
                        <div
                            key={index}    
                            className='flex min-w-[500px] items-center mr-6 rounded-lg'
                        >
                            <ReactPlayer
                                controls={true}
                                className='h-[200px] rounded-lg cursor-pointer'
                                url={`https://www.youtube.com/watch?v=${trailer.key}`} 
                            />
                    </div>
                    ))}
                </div>
                {showArrows && (
                    <div>
                    <button 
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                        onClick={() => scrollLeft(sliderRef3)}
                    >
                        <FaAngleLeft/>
                    </button>
                    <button 
                    className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                    onClick={() => scrollRight(sliderRef3)}>
                        <FaAngleRight/>
                    </button>
                    </div>
                )}
            </div>
            )}
            <div onClick={onWatchClick} className='px-12 relative mt-8'>
                <h1 className='cursor-pointer text-2xl font-bold capitalize'>Watch Providers</h1>
            </div>
            <div onClick={onReviewClick} className='px-12 relative mt-8'>
                <h1 className='cursor-pointer text-2xl font-bold capitalize mb-8'>Reviews</h1>
            </div>
        </div>
    
    </div>
  )
}

export default Details
