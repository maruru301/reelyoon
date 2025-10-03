import './App.css';

import { useEffect, useState } from 'react';

import { fetchTopRatedMovies } from './api/tmdb';

function App() {
    const [movies, setMovies] = useState([]); // 영화 리스트 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await fetchTopRatedMovies();
                setMovies(movies);
            } catch (err) {
                console.error('영화 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Reelyoon</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
