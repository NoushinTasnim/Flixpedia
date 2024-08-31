import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { useContentStore } from '../store/content';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { saveContent } from '../store/saveContent';
import Aos from 'aos'
import 'aos/dist/aos.css'

const MyList = () => {
    useEffect(()=>{
        Aos.init();
      },[])
    const [selectedCategory, setSelectedCategory] = useState('movie'); 
    const [content, setContent] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setContentType } = useContentStore();
    const navigate = useNavigate();
    const { deleteMovie, deleteSeries } = saveContent();

    const getMovies = async (category) => {
        try {
          setLoading(true);
          const res = await axios.get(`/api/v1/save/${category}`);
          if (category === 'movie') setContent(res.data.savedMovies);
          if (category === 'tv') setContent(res.data.savedSeries);
          console.log(res.data);
          setError('');
        } catch (e) {
          setContent([]);
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
        console.log(selectedCategory);
        getMovies(selectedCategory);
    }, [selectedCategory]);

    const handleDelete = async (id) => {
        try {
            if (selectedCategory === 'movie') {
                await deleteMovie(id);
            } else if (selectedCategory === 'tv') {
                await deleteSeries(id);
            }
            // Update the content state by filtering out the deleted item
            setContent(prevContent => prevContent.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return (
        <div className='flex w-full justify-center'>
            <Navbar />
            <div className='flex flex-col w-full mx-8 items-center justify-center py-24'>
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
                </div>
                <div className='mx-4 w-full text-center mt-8 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 xs:gap-8'>
                    {loading && <p className='w-full text-white'>Loading...</p>}
                    {error && <p className='text-red-500'>{error}</p>}
                    {!loading && !error && content.length > 0 && content.map((item) => (
                        <div 
                            data-aos="zoom-in"
                            key={item.id} 
                            className='flex flex-col'
                        >
                            <div className="h-[180px] md:h-[200px] xl:h-[225px] w-full rounded-lg bg-white flex items-center justify-center">
                                {(item?.poster_path) ? 
                                    <img 
                                        onClick={()=>{
                                            if(selectedCategory==='movie'){
                                                setContentType('movie');
                                                navigate('/details/' + item.id);
                                            }
                                            if(selectedCategory==='tv'){
                                                setContentType('tv');
                                                navigate('/details/' + item.id);
                                            }
                                        }} 
                                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out"  
                                        src={SMALL_IMG_BASE_URL + (item.poster_path)}
                                        alt={item.title || item.original_name || item.name} 
                                    />     
                                : 
                                    <span className='text-black text-center'>
                                        No Image
                                    </span>
                                }
                            </div>
                            <div 
                                onClick={() => handleDelete(item.id)}
                                className='flex text-center items-center justify-center space-x-2 mt-2 hover:border hover:border-red-500 cursor-pointer'
                            >
                                <FaTrash className='text-red-600'/>
                                <h1 className='text-red-600'>Delete</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyList;