import './Main.css';

import { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } from '../../api/tmdb';
import { useEffect, useState } from 'react';

import ContentList from './ContentList';

const Main = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]); // Top Rated 영화 리스트
    const [timeWindow, setTimeWindow] = useState('day');
    const [popular, setPopular] = useState([]);

    // Trending (Daily / Weekly)
    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const data = await fetchTrendingMovies(timeWindow);
                setTrending(data);
            } catch (err) {
                console.error('Trending 영화 데이터 불러오기 실패', err);
            }
        };
        fetchTrending();
    }, [timeWindow]);

    // Top Rated
    useEffect(() => {
        const fetchData = async () => {
            try {
                const topRatedData = await fetchTopRatedMovies();
                setTopRated(topRatedData);
            } catch (err) {
                console.error('Top Rated 영화 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    // Popular
    useEffect(() => {
        const fetchData = async () => {
            try {
                const popularData = await fetchPopularMovies();
                setPopular(popularData);
            } catch (err) {
                console.error('Top Rated 영화 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="main">
            <ContentList
                title={'Trending'}
                contents={trending}
                showTimeWindow={true}
                timeWindow={timeWindow}
                setTimeWindow={setTimeWindow}
            />
            <ContentList title="Top Rated Movies" contents={topRated} />
            <ContentList title="Popular" contents={popular} />
        </main>
    );
};

export default Main;
