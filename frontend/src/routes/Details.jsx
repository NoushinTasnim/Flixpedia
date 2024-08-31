import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useContentStore } from '../store/content';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import CategoricalBox from '../components/CategoricalBox';
import man from '../assets/images.png';
import countries from '../utils/countries';
import Navbar from '../components/Navbar';
import Aos from 'aos'
import 'aos/dist/aos.css'

const Details = () => {
    useEffect(()=>{
        Aos.init();
      },[])

    const {id} = useParams();
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posterLoading, setPosterLoading] = useState(true);
    const [posterIdx, setPosterIdx] = useState(0);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
    const [posters, setPosters] = useState([]);
    const [cast, setCast] = useState([]);
    const [keyword, setKeyword] = useState([]);
    const {contentType} = useContentStore();
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);
    const sliderRef3 = useRef(null);

    
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
        const getPosters = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/posters`);
                
                setPosters(res.data.content);
                setPosterIdx(0);
            }
            catch(e){
                if(e.message.includes('404')){
                    setPosters([]);
                }
            }
        };

        getPosters();
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

    useEffect(()=> {
        const getKeyword = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/keywords`);
                
                setKeyword(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setKeyword([]);
                }
            }
        };

        getKeyword();
    },[contentType, id]);

  return (
    <div>
        <Navbar/>
        <div className='w-full flex flex-col space-y-10'>
            <div className='w-full h-[50vh] rounded-lg justify-center top-0'>
                <div className="h-[50vh] relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/50 after:via-black/40 after:to-[#101010] after:z-10">
                    <div className="relative w-full h-[50vh] overflow-hidden z-1">
                        <div className='relative items-center justify-center'>
                            {loading && (
                                <div className='top-0 left-0 w-full bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
                            )}
                            <img 
                                src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path}
                                className='w-full h-[50vh] object-cover'
                                onLoad={()=>{setLoading(false)}}
                            />
                            <div className='space-y-1 lg:space-y-4 capitalize absolute top-2/3 lg:top-1/4 right-4 lg:right-[10%] text-right z-20'>
                                <h1 className='text-2xl lg:text-7xl font-extrabold'>{content?.title ? content.title : content.name}</h1>
                                <h1 className='capitalize text-right font-medium text-white text-xs lg:text-2xl z-20'>{content?.tagline}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-col sm:flex sm:flex-row p-4 lg:p-12 items-center lg:items-start justify-center'>
                {posters?.length > 0 && (
                    <div className='relative my-auto flex items-center justify-center'>
                        <button 
                            className='top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                            onClick={() => setPosterIdx((posterIdx - 1 + posters.length) % posters.length)}
                        >
                            <FaAngleLeft/>
                        </button>
                        {posterLoading && (
                            <div className=' bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
                        )}
                        <img 
                            data-aos="fade-right"
                            className='h-[40vh] rounded-xl'
                            onLoad={()=>{setPosterLoading(false)}}
                            src={ORIGINAL_IMG_BASE_URL + posters[posterIdx].file_path}
                        />
                        <button 
                            className=' top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10' 
                            onClick={() => setPosterIdx((posterIdx + 1) % posters.length)}
                        >
                            <FaAngleRight/>
                        </button>
                    </div>
                )}
                <div data-aos="fade-left" className='relative sm:px-4 lg:px-8 z-10 space-y-4 mt-8 lg:mt-0 lg:mr-8 lg:basis-2/5'>
                    <h4 className=''>Overview</h4>
                    <p className='lg:max-w-lg font-extralight'>{content?.overview}</p>
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
                    {(content?.origin_country?.length > 0) && (
                        <div className='flex flex-nowrap sm:px-4 lg:px-0 space-x-2 w-full items-center'>
                            <h3 className='text-white font-normal text-sm'>Origin Country: </h3>
                            {content?.origin_country?.map((countryCode) => {
                                const country = countries.find(c => c.iso_3166_1 === countryCode);
                                const countryName = country ? country.english_name : countryCode;
                                
                                return (
                                    <div key={countryCode} className='py-1'>
                                        <h3 className='text-white font-extralight text-sm'>{countryName}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {(content?.genres?.length > 0) && (
                        <div className='flex flex-nowrap sm:px-4 lg:px-0 space-x-2 w-full items-center'>
                        {content?.genres?.map((genre) => (
                            <div key={genre.id} className='border border-white rounded-xl py-1 px-4'>
                                <h3 className='text-white font-extralight text-sm' >{genre.name}</h3>
                            </div>
                        ))}
                        </div>
                    )}
                    <div className='flex space-x-8 sm:px-4 text-white font-light text-sm'>
                        <h3 className=''>
                            {content?.number_of_seasons ? `Total Seasons: ${content.number_of_seasons}` : ''}
                        </h3>
                        <h3 className=''>
                            {content?.number_of_seasons ? `Total Episodes: ${content.number_of_episodes}` : ''}
                        </h3>
                    </div>
                </div>
                <div data-aos="fade-left" className='relative lg:px-8 sm:px-4 z-10 space-y-4 basis-2/5'>
                    <h4 className=''>Keywords</h4>
                    {keyword?.length > 0 && (
                        <div className='flex flex-wrap w-full items-center'>
                        {keyword?.map((keywords) => (
                            <div key={keywords.id} className='border border-white rounded-xl py-1 px-4 mb-2 mr-2 hover:bg-slate-800'>
                                <h3 className='text-white font-extralight text-sm'>{keywords.name}</h3>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            {cast?.length > 0 && (
                <div  
                    className='mx-16'
                     data-aos="zoom-in-right"
                    data-aos-anchor-placement="top-center" 
                    onMouseEnter={() => setShowArrows(true)}
                    onMouseLeave={() => setShowArrows(false)}
                >
                    <h1 className='mt-8 text-lg lg:text-2xl font-bold mb-4 capitalize'>Casts</h1>
                    <div className='flex space-x-4 sm:space-x-10 w-full items-center overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef1}>
                        {cast?.map((item, id) => (
                            <Link to={`/cast/${item.id}`} key={id} className='flex flex-col items-center'>
                                <div className='w-[80px] sm:w-[120px] relative group rounded-full overflow-hidden hover:scale-110 hover:my-4'>
                                    <img 
                                        src={item?.profile_path ? SMALL_IMG_BASE_URL + item?.profile_path : man}
                                        alt={item.name} 
                                        className='w-full h-full object-cover' 
                                    />

                                </div>
                            <p className='text-white text-center text-xs font-thin mt-4'>{item.character}</p>
                            <p className='text-white text-center text-sm font-medium mt-2'>{item.name}</p>
                        </Link>                    
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
                 data-aos="zoom-in-right"
                data-aos-anchor-placement="top-center" 
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)} 
                className='px-4 sm:px-8 lg:px-12 relative'
            >
                <h1 className='mt-8 text-lg lg:text-2xl font-bold mb-4 capitalize'>Recommendations</h1>
                <div className='flex space-x-4 lg:space-x-8 w-full items-center overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef2}>
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
                data-aos="zoom-in-right"
                data-aos-anchor-placement="top-center" 
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)} 
                className='px-12 relative mt-32 justify-center items-center'
            >
                <h1 className='mt-10 mb-0 text-lg lg:text-2xl font-bold'>Videos</h1>
                <div className='flex space-x-4 overflow-y-clip overflow-x-scroll scrollbar-hide mt-8' ref={sliderRef3}>
                    {trailers.map((trailer, index) => (
                        <div
                            key={index}    
                            className='flex w-[250px] h-[200px] sm:h-[250px] sm:w-[400px] lg:min-w-[500px] items-center mr-6 rounded-lg'
                        >
                            <ReactPlayer
                                controls={true}
                                className='h-[10px] lg:h-[200px] rounded-lg cursor-pointer overflow-y'
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
            <Link to={`/watch-providers/${id}`} className='px-12 relative mt-8'>
                <h1 className='cursor-pointer text-lg lg:text-2xl font-bold capitalize'>Watch Providers</h1>
            </Link>
            <Link to={`/reviews/${id}`} className='px-12 relative mt-8'>
                <h1 className='cursor-pointer text-lg lg:text-2xl font-bold capitalize mb-8'>Reviews</h1>
            </Link>
        </div>
    
    </div>
  )
}

export default Details