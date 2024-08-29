import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';

const MediaGrid = ({ title, items, initialCount = 8 }) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center mb-4 mt-16'>
                <h1 className='text-xl font-bold'>{title}</h1>
                {items.length > initialCount && (
                    <button 
                        className='mt-4 text-blue-500 hover:underline' 
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Hide All' : `Show All (${items.length})`}
                    </button>
                )}
            </div>
            <div className={`grid grid-cols-8 gap-4 text-center transition-transform duration-300 ease-in-out`}>
                {(showAll ? items : items.slice(0, initialCount))?.map((item) => (
                    <div key={item.id} className='py-1 mb-2 hover:scale-110'>
                        <Link to={`/details/${item.id}`}>
                        <div className="w-40 h-60 rounded-lg bg-white flex items-center justify-center">
                            {item?.poster_path ? (
                                <img 
                                    src={`${SMALL_IMG_BASE_URL}${item?.poster_path}`} 
                                    className="w-full h-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-12" 
                                />
                            ) : (
                                <span className="text-black">{item?.title ? item.title : item.name}</span>
                            )}
                        </div>
                        </Link>
                        <h3 className='mt-2 text-sm font-thin text-white'>
                            {item.character || item.department || ''}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaGrid;
