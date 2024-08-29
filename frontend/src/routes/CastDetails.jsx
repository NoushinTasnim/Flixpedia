import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CastHeader from '../components/CastHeader';
import MediaGrid from '../components/MediaGrid';
import Navbar from '../components/Navbar';

const CastDetails = () => {
    const { id } = useParams();
    const [cast, setCast] = useState({});
    const [castMovies, setCastMovies] = useState([]);
    const [castMovieCrew, setCastMovieCrew] = useState([]);
    const [castSeries, setCastSeries] = useState([]);
    const [castSeriesCrew, setCastSeriesCrew] = useState([]);

    useEffect(() => {
        const getCast = async () => {
            try {
                const res = await axios.get(`/api/v1/cast/${id}`);
                setCast(res.data.content);
            } catch (e) {
                if (e.message.includes('404')) {
                    setCast({});
                }
            }
        };
        getCast();
    }, [id]);

    useEffect(() => {
        const getCastMovies = async () => {
            try {
                const res = await axios.get(`/api/v1/cast/${id}/movies`);
                setCastMovies(res.data.content.cast);
                setCastMovieCrew(res.data.content.crew);
            } catch (e) {
                if (e.message.includes('404')) {
                    setCastMovies([]);
                }
            }
        };
        getCastMovies();
    }, [id]);

    useEffect(() => {
        const getCastSeries = async () => {
            try {
                const res = await axios.get(`/api/v1/cast/${id}/series`);
                setCastSeries(res.data.content.cast);
                setCastSeriesCrew(res.data.content.crew);
            } catch (e) {
                if (e.message.includes('404')) {
                    setCastSeries([]);
                }
            }
        };
        getCastSeries();
    }, [id]);

    return (
        <div>
            <Navbar/>
            <div className='py-24 px-16 space-y-8'>
                <CastHeader cast={cast} />
                {castMovies.length > 0 && <MediaGrid title="Movies (Actor)" items={castMovies} />}
                {castSeries.length > 0 && <MediaGrid title="Series (Actor)" items={castSeries} />}
                {castMovieCrew.length > 0 && <MediaGrid title="Movies (Crew)" items={castMovieCrew} />}
                {castSeriesCrew.length > 0 && <MediaGrid title="Series (Crew)" items={castSeriesCrew} />}

            </div>
        </div>
    );
};

export default CastDetails;
