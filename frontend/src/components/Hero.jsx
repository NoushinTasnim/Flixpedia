import { Link } from 'react-router-dom';
import './Hero.css';
import React , {useState} from 'react';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const Hero = () => {
  const {trendingContent} = useGetTrendingContent();
  const [imgLoading, setImgLoading] = useState(true);

  if(!trendingContent){
    return (
      <div className='h-screen text-white relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
      </div>
    )
  }

  return (
    <div className='h-[50vh] lg:h-[100vh] w-full'>
      <div className='mask1'>
        <div>
          {imgLoading && (
            <div className='absolute top-0 left-0 w-full h-[100vh] bg-[#101010] flex items-center justify-center -z-10 shimmer'/>
          )}
          <img 
          className='w-full h-[50vh] lg:h-[100vh] object-cover'
            src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
            onLoad={()=>{
              setImgLoading(false)
            }}
          />
        </div>
      </div>
      <div className='absolute top-1/4 xs:left-8 xs:right-8 mx-4 sm:left-12 text-left z-10 lg:top-1/3'>
        <h1 className='text-base xs:text-2xl sm:text-4xl lg:text-6xl font-rye tracking-tighter sm:tracking-wide font-semibold'>
          {trendingContent ? (trendingContent.title ? trendingContent.title : trendingContent.name ) : "hoo"}
        </h1>
        <h4
          className='sm:pt-2 lg:pt-4 pb-2 text-xs sm:text-lg lg:text-xl font-thin sm:font-medium'
        >
          {trendingContent?.release_date?.split('-')[0] || trendingContent?.first_air_date?.split('-')[0]} | {trendingContent?.adult ? '18+' : 'PG-13'}
        </h4>
        <p
          className='py-0 lg:py-2 max-w-full sm:max-w-lg lg:max-w-lg text-xs sm:text-sm lg:text-lg font-extralight'
        >
          {trendingContent ? (trendingContent.overview.length > 200) ? trendingContent.overview.slice(0,200) + "..." : trendingContent.overview : "ahsahs"}
        </p>
        <div className=' py-1 sm:py-4 lg:py-8 items-startcenter'>
          <Link to={`/details/${trendingContent?.id}`} 
            className='bg-red-500 px-4 py-1 lg:py-2 text-white rounded-sm sm:rounded-lg hover:bg-red-900 text-xs sm:text-base lg:text-md'
          >
            More Info
          </Link>
        </div>
      </div>      
    </div>
  );
}

export default Hero;
