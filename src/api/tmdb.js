const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    },
};

// Top Rated
export const fetchTopRatedContents = async (mediaType = 'movie', page = 1) => {
    const url = `${BASE_URL}/${mediaType}/top_rated?language=ko&page=${page}`;
    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Top Rated Movies API 호출 실패:', err);
    }
};

// Popular
export const fetchPopularContents = async (mediaType = 'movie', page = 1) => {
    const url = `${BASE_URL}/${mediaType}/popular?language=ko&page=${page}`;
    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Popular Movies API 호출 실패:', err);
    }
};

// Movie Details
export const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error(`Movie Details (${movieId}) API 호출 실패:`, err);
    }
};

// Trending (day: 일간, week: 주간)
export const fetchTrendingContents = async (mediaType = 'movie', timeWindow = 'day') => {
    const url = `${BASE_URL}/trending/${mediaType}/${timeWindow}?language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error(`Trending Movies (${timeWindow}) API 호출 실패:`, err);
    }
};

// Search
export const fetchSearchContents = async (query, page = 1) => {
    if (!query) return { results: [], totalPages: 1, totalMovieResults: 0, totalTvResults: 0 };

    try {
        const [moviesRes, tvRes] = await Promise.all([
            fetch(`${BASE_URL}/search/movie?query=${query}&language=ko&page=${page}`, options),
            fetch(`${BASE_URL}/search/tv?query=${query}&language=ko&page=${page}`, options),
        ]);

        const movieData = await moviesRes.json();
        const tvData = await tvRes.json();

        // 각 결과에 media_type 명시
        const results = [
            ...movieData.results.map((item) => ({ ...item, media_type: 'movie' })),
            ...tvData.results.map((item) => ({ ...item, media_type: 'tv' })),
        ];

        return {
            results,
            totalPages: Math.max(movieData.total_pages, tvData.total_pages),
            totalMovieResults: movieData.total_results ?? 0,
            totalTvResults: tvData.total_results ?? 0,
        };
    } catch (err) {
        console.error(`Search API 호출 실패:`, err);

        return { results: [], totalPages: 1, totalMovieResults: 0, totalTvResults: 0 };
    }
};

// Movie Videos (Trailer)
export const fetchMovieVideos = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/videos?language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        // 트레일러만 필터링
        const trailers = data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');

        return trailers;
    } catch (err) {
        console.error(`Movie Videos API 호출 실패:`, err);
        return [];
    }
};

// Movie Images
export const fetchMovieImages = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/images?include_image_language=en-US`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error(`Movie Images API 호출 실패:`, err);
    }
};
