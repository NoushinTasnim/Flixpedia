import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand'

export const saveContent = create((set) => ({
    isSavingMovie: false,
    isSavingSeries: false,
    saveMovie: async(content) => {
        try{
            set({
                isSavingMovie: true,
            })
            await axios.post(`/api/v1/save/movie`, content);
            toast.success('Save successful');
        }
        catch(e){
            toast.error(e.response.data.message || 'Save failed');
            set({
                isSavingMovie: false,
            });
        }
    },
    saveSeries: async(content) => {
        try{
            console.log(content);
            set({
                isSavingSeries: true,
            })
            await axios.post(`/api/v1/save/tv`, content);
            toast.success('Save successful');
        }
        catch(e){
            toast.error(e.response.data.message || 'Save failed');
            set({
                isSavingSeries: false,
            });
        }
    },
    deleteMovie: async(movieId)=> {
        try {
          const response = await fetch(`/api/v1/save/movie/${movieId}`, {
            method: 'DELETE',
          });
      
          const data = await response.json();
      
          if (data.success) {
            console.log('Movie deleted:', data.message);
            console.log('Updated saved movies:', data.savedMovies);
          } else {
            console.error('Failed to delete movie:', data.message);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      },
      deleteSeries: async(seriesId)=> {
          try {
            const response = await fetch(`/api/v1/save/tv/${seriesId}`, {
              method: 'DELETE',
            });
        
            const data = await response.json();
        
            if (data.success) {
              console.log('Series deleted:', data.message);
              console.log('Updated saved series:', data.savedSeries);
            } else {
              console.error('Failed to delete series:', data.message);
            }
          } catch (error) {
            console.log('Error:', error);
          }
        }
      
}));