import { fetchMovieDetails, fetchMovieImages, fetchMovieVideos } from '../api/detailsApi';
import { useEffect, useState } from 'react';

import { fetchPopularContents } from '../api/listApi';

const useBannerMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // loading 상태

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const popularMovies = await fetchPopularContents();

                const moviePromises = popularMovies.map(async (movie) => {
                    // 트레일러 가져오기
                    const trailers = await fetchMovieVideos(movie.id);
                    if (!trailers.length) return null;
                    const trailerKey = trailers[0].key;

                    // 상세 정보 가져오기
                    const details = await fetchMovieDetails(movie.id);

                    // 로고 이미지 가져오기
                    const images = await fetchMovieImages(movie.id);
                    const logoUrl = images.logos?.[0]?.file_path || '';

                    // 로고가 없으면 제외
                    if (!logoUrl) return null;

                    return { ...movie, ...details, trailerKey, logoUrl };
                });

                // 트레일러가 있는 영화만 담을 배열
                const moviesWithTrailerAndLogo = (await Promise.all(moviePromises))
                    .filter(Boolean) // null 제거
                    .slice(0, 7);

                setMovies(moviesWithTrailerAndLogo);
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
