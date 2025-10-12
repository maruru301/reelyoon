import './Main.css';

import { fetchTopRatedMovies, fetchTrendingMovies } from '../../api/tmdb';
import { useEffect, useState } from 'react';

import ContentList from './ContentList';

const Main = () => {
    const [topRated, setTopRated] = useState([]); // Top Rated 영화 리스트
    const [trending, setTrending] = useState([]);
    const [timeWindow, setTimeWindow] = useState('day');

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
        </main>
    );
};

export default Main;
