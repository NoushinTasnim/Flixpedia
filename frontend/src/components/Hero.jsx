import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import React from 'react';
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeHigh } from 'react-icons/fa6';
import useGetTrendingContent from '../hooks/useGetTrendingContent';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const Hero = () => {
  const {trendingContent} = useGetTrendingContent();
  console.log("trending: ", trendingContent);

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const loadYouTubePlayer = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        const ytPlayer = new window.YT.Player('video-iframe', {
          events: {
            onReady: onPlayerReady,
          },
        });
        setPlayer(ytPlayer);
      };
    };

    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    loadYouTubePlayer();
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className='hero1'>
      <div className='mask1'>
      <div className="video-container" onClick={togglePlayPause}>
        {/* <iframe
          id="video-iframe"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/mqqft2x_Aa4?enablejsapi=1&autoplay=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&mute=0&rel=0&iv_load_policy=3&fs=1&disablekb=1&start=0&end=0&loop=1"
          title="YouTube video player"
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
        >
        </iframe> */}
        <div>
          <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}/>
        </div>
        </div>
      </div>
      
      <div className='txt'>
        <h1>{trendingContent ? (trendingContent.title ? trendingContent.title : trendingContent.name ) : "hoo"}</h1>
        <h4>{trendingContent?.release_date?.split('-')[0] || trendingContent?.first_air_date?.split('-')[0]} | {trendingContent?.adult ? '18+' : 'PG-13'}</h4>
        <p>{trendingContent ? (trendingContent.overview.length > 200) ? trendingContent.overview.slice(0,200) + "..." : trendingContent.overview : "ahsahs"}</p>
        <div className='btns'>
          <Link to='' className='btn'>Play</Link>
          <Link to='' className='btn-light'>More Info</Link>
        </div>
      </div>
      <div className='mute'>
        {isMuted ? (
          <FaVolumeMute color='white' onClick={toggleMute} className='mic' />
        ) : (
          <FaVolumeHigh color='white' onClick={toggleMute} className='mic' />
        )}
      </div>
      
    </div>
  );
}

export default Hero;
