import { fetchMovieDetails, fetchMovieVideos, fetchPopularContents } from '../api/tmdb';
import { useEffect, useState } from 'react';

const useBannerMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // loading 상태

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const popularMovies = await fetchPopularContents();

                const moviePromises = popularMovies.map(async (movie) => {
                    const trailers = await fetchMovieVideos(movie.id);

                    if (trailers.length > 0) {
                        // 트레일러가 있는 경우
                        const details = await fetchMovieDetails(movie.id);
                        return { ...movie, ...details, trailerKey: trailers[0].key };
                    }

                    return null; // 트레일러 없음
                });

                // 트레일러가 있는 영화만 담을 배열
                const moviesWithTrailer = (await Promise.all(moviePromises))
                    .filter(Boolean) // null 제거
                    .slice(0, 7);

                setMovies(moviesWithTrailer);
            } catch (err) {
                console.error('영화 데이터 불러오기 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return { movies, loading };
};

export default useBannerMovies;
