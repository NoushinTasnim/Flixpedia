import React from 'react';
import { SMALL_IMG_BASE_URL } from '../utils/constants';

const CastHeader = ({ cast }) => {
    return (
        <div className='flex space-x-8 items-center'>
            <img className='w-[200px] rounded-lg' src={SMALL_IMG_BASE_URL + cast.profile_path} alt={cast.name} />
            <div className='flex flex-col space-y-2'>
                <h1 className='text-4xl font-semibold'>{cast.name}</h1>
                <div className='flex justify-between'>
                    <h3 className='text-lg font-light text-white'>Known for: {cast.known_for_department}</h3>
                    <h3 className='text-lg font-light text-white'>
                        {cast?.birthday ? `Born on: ${new Date(cast.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
                    </h3>
                </div>
                <h3 className='text-white font-extralight '>
                    {cast?.biography}
                </h3>
            </div>
        </div>
    );
};

export default CastHeader;
