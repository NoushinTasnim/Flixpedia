import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Trending from '../components/Trending'
import Categorical from '../components/categorical'
import useGetTrendingContent from '../hooks/useGetTrendingContent'
import { useContentStore } from '../store/content'
import { MOVIE_CATEGORIES, TV_CATEGORIES } from '../utils/constants'

const Dashboard = () => {
  const {trendingContent} = useGetTrendingContent();
  const {contentType} = useContentStore();

  return (
    <div>
      <Navbar/>
      <Hero/>
      <Trending/>
      <div>
      {contentType === 'movie' 
          ? MOVIE_CATEGORIES.map((category) => <Categorical key={category} category={category}/>)
          : TV_CATEGORIES.map((category) => <Categorical key={category} category={category}/>)}
      </div>
    </div>
  )
}

export default Dashboard
