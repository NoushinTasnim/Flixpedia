import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { useContentStore } from '../store/content';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTxt, setSearchTxt] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setContentType} = useContentStore();
  const [selectedCategory, setSelectedCategory] = useState('movie'); // Track selected category

  const navigate = useNavigate();

  const getDetails = async (data, category) => {
    if (!data) {
      setSearchedData([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/search/${category}/${data}`);
      setSearchedData(res.data.content);
      console.log(res.data.content);
      setError('');
    } catch (e) {
      setSearchedData([]);
      if (e.message.includes('404')) {
        setError('No results found.');
      } else {
        setError('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTxt) {
      getDetails(searchTxt, selectedCategory);
    }
  }, [selectedCategory, searchTxt]); // Ensure getDetails is called with the latest category and search text

  return (
    <div className='flex w-full justify-center'>
      <Navbar />
      <div className='flex flex-col w-full mx-8 items-center justify-center py-24'>
        <input
          type="string"
          placeholder="Search Movies, TV Shows and Persons..."
          name="search"
          className='w-1/2 text-left bg-[#63636340] border rounded-full px-4 py-2 text-white text-sm'
          required
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <div className='flex w-full m-4 text-center items-center justify-center space-x-4'>
          <div
            className={`px-4 py-1 rounded-lg cursor-pointer ${
              selectedCategory === 'movie' ? 'bg-red-500' : 'bg-white'
            } hover:bg-red-500`}
            onClick={() => setSelectedCategory('movie')}
          >
            <h1 className={`${
              selectedCategory === 'movie' ?  'text-white font-medium' : 'font-light text-black'
            } hover:text-white`}>Movies</h1>
          </div>
          <div
            className={`px-4 py-1 rounded-lg cursor-pointer ${
              selectedCategory === 'tv' ? 'bg-red-500' : 'bg-white'
            } hover:bg-red-500 hover:text-white`}
            onClick={() => setSelectedCategory('tv')}
          >
            <h1 className={`${
              selectedCategory === 'tv' ?  'text-white font-medium' : 'text-black font-light'
            } hover:text-white`}>Series</h1>
          </div>
          <div
            className={`px-4 py-1 rounded-lg cursor-pointer ${
              selectedCategory === 'person' ? 'bg-red-500' : 'bg-white'
            } hover:bg-red-500 hover:text-white`}
            onClick={() => setSelectedCategory('person')}
          >
            <h1 className={`${
              selectedCategory === 'person' ?  'text-white font-medium' : 'text-black font-light'
            } hover:text-white`}>Persons</h1>
          </div>
        </div>
        <div className='mx-4 w-full text-center mt-8 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 xs:gap-8'>
          {loading && <p className='w-full text-white'>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {!loading && !error && searchedData.length > 0 && searchedData.map((item) => (
            <div 
              key={item.id} 
              className='flex flex-col'
              onClick={()=>{
                if(selectedCategory==='movie'){
                  setContentType('movie');
                  navigate('/details/' + item.id);
                }
                if(selectedCategory==='tv'){
                  setContentType('tv');
                  navigate('/details/' + item.id);
                }
                if(selectedCategory==='person'){
                  navigate('/cast/' + item.id);
                }
              }}
            >
            <div className="h-[180px] md:h-[200px] xl:h-[225px] w-full rounded-lg bg-white flex items-center justify-center">
              {(item?.poster_path || item?.profile_path) ? 
                <img 
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-125"  
                  src={SMALL_IMG_BASE_URL + (item.poster_path || item.profile_path)}
                  alt={item.title || item.original_name || item.name} 
                />     
                : 
                <span className='text-black text-center'>
                  No Image
                </span>
              }
            </div>
              <h1 className='mt-2'>{item.title || item.original_name || item.name} 
              ({item?.release_date?.split('-')[0] || item?.known_for_department })</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
