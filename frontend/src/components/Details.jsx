import React from 'react'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants'

const Details = ({content}) => {
  return (
    <div>
      <div className='w-full h-[50vh] rounded-lg justify-center top-0'>
                <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/50 after:via-black/40 after:to-[#101010] after:z-10">
                <div className="relative w-full h-[50vh] overflow-hidden z-1">
                    <div>
                        <img src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative pl-8 z-10 space-y-4'>
            <h1 className='text-4xl font-bold'>{content?.title ? content.title : content.name}</h1>
            <p>
                Released:  {content?.release_date 
                ? new Date(content.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : content?.first_air_date 
                ? new Date(content.first_air_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : "N/A "
                } | Runtime: {content?.runtime ? `${content.runtime} mins ` : "Unknown "} 
                | {content?.adult ? '18+' : 'PG-13'}
            </p>
            <p className='max-w-full font-extralight'>{content?.overview}</p>
        </div>
    </div>
  )
}

export default Details
