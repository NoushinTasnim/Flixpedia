import React, { useEffect, useState } from 'react'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useContentStore } from '../store/content';
import { useParams } from 'react-router-dom';
import countries from '../utils/countries'
import Details from './Details';
import Navbar from './Navbar';

const WatchProviders = () => {
    const {id} = useParams();
    const [watchProviders, setWatchProviders] = useState([]);
    const [content, setContent] = useState({});
    const {contentType} = useContentStore();

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
        const getWatchProviders = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/watch/providers`);
                
                setWatchProviders(res.data.content);
            }
            catch(e){
                if(e.message.includes('404')){
                    setWatchProviders([]);
                }
            }
        };

        getWatchProviders();
    },[contentType, id]);
  return (
    <>
        <Navbar/>
        <div className='relative'>
            <Details key={content.id} content={content}/>
            <div className='px-8'>
                <h1 className='mt-20 text-2xl font-bold mb-4 capitalize'>Watch Providers</h1>
                <div className='w-full items-center overflow-x-scroll scrollbar-hide mt-8'>
                    {Object.entries(watchProviders).length > 0 ? (
                        Object.entries(watchProviders).map(([countryCode, countryData]) => {
                            const country = countries.find(c => c.iso_3166_1 === countryCode);
                            const countryName = country ? country.english_name : countryCode;
                            if(countryData?.flatrate){
                            return (
                            <div key={countryCode} className="mb-8">
                                <a 
                                    href={countryData.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="cursor-pointer block mb-4 text-blue-500 font-bold"
                                >
                                    {countryName}
                                </a>
                                <div className="flex space-x-4">
                                    {countryData.flatrate?.map((provider) => (
                                        <img
                                        key={provider.provider_id}
                                        src={`${SMALL_IMG_BASE_URL}${provider.logo_path}`}
                                        alt={provider.provider_name}
                                        title={provider.provider_name}
                                        className="w-12 h-12 object-contain rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                            );
                        }
                        })
                        ) : (
                        <p>No providers available</p>
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default WatchProviders
