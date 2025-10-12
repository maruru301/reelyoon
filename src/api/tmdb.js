const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    },
};

// Top Rated Movies
export const fetchTopRatedMovies = async (page = 1) => {
    const url = `${BASE_URL}/movie/top_rated?language=ko&page=${page}`;
    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error('Top Rated Movies API 호출 실패:', err);
    }
};

// Popular
export const fetchPopularMovies = async (page = 1) => {
    const url = `${BASE_URL}/movie/popular?language=ko&page=${page}`;
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

// Trending Movies (day: 일간, week: 주간)
export const fetchTrendingMovies = async (timeWindow = 'day') => {
    const url = `${BASE_URL}/trending/movie/${timeWindow}?language=ko`;

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.results;
    } catch (err) {
        console.error(`Trending Movies (${timeWindow}) API 호출 실패:`, err);
    }
};
