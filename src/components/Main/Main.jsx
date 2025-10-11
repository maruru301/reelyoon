import './Main.css';

import { useEffect, useState } from 'react';

import ContentList from './ContentList';
import { fetchTopRatedMovies } from '../../api/tmdb';

const Main = () => {
    const [movies, setMovies] = useState([]); // 영화 리스트 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await fetchTopRatedMovies();
                setMovies(movies);
            } catch (err) {
                console.error('Top Rated 영화 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="main">
            <ContentList title="Top Rated Movies" contents={movies} />
        </main>
    );
};

export default Main;
