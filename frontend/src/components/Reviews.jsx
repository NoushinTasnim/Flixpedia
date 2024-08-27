import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContentStore } from '../store/content';
import { Link, useParams } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';
import { FaStar } from 'react-icons/fa';
import Details from './Details';

const Reviews = () => {
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);
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
        const getReviews = async () => {
            try{
                const res = await axios.get(`/api/v1/${contentType}/${id}/reviews`);
                
                setReviews(res.data.content);
                console.log(res.data.content)
            }
            catch(e){
                if(e.message.includes('404')){
                    setReviews([]);
                }
            }
        };

        getReviews();
    },[contentType, id]);
  return (
    <div className='relative'>
        <Details key={content.id} content={content}/>
        {reviews?.length >0 ?
         <div className='px-8'>
         <h1 className='mt-20 text-2xl font-bold mb-4 capitalize'>Reviews</h1>
         <div className='w-full space-y-4 items-center my-8'>
             {reviews?.map((review) => (
                 <div key={review.id} className='border-b-2 border-[#e5e5e555] p-4 rounded-lg shadow-inner shadow-[#e5e5e555]'>
                         <div className='flex justify-between items-center mb-4'>
                             <div className='flex space-x-4 items-center'>
                                 <FaStar className='text-yellow-400 text-xl' />
                                 <h1 className='text-white font-medium text-xl' >{review?.author_details?.rating}/10</h1>
                             </div>
                             <a href={review?.url} className='text-blue-600 text-sm' >View Review</a>
                         </div>
                         <h1 className='text-white font-bold text-base' >Review by: {review?.author}</h1>
                         <h6 className="text-slate-400 font-extralight text-xs mb-2">
                             Written on: {new Date(review?.created_at).toLocaleDateString('en-US', {
                                 year: 'numeric',
                                 month: 'long',
                                 day: 'numeric',
                             })}{' '}
                             at{' '}
                             {new Date(review?.created_at).toLocaleTimeString('en-US', {
                                 hour: '2-digit',
                                 minute: '2-digit',
                                 hour12: true,
                             })}
                         </h6>
                         <h3 className='text-white font-extralight text-sm' >{review.content}</h3> 
                 </div>
             ))}
         </div>
     </div>
         :
         <p className='p-8 font-bold'>No Reviews Found</p>
         }
    </div>
  )
}

export default Reviews
