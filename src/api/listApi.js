import { BASE_URL, fetchFromApi } from './tmdbCommon.js';

// Top Rated
export const fetchTopRatedContents = async (mediaType = 'movie', page = 1) => {
    const url = `${BASE_URL}/${mediaType}/top_rated?language=ko&page=${page}`;
    const data = await fetchFromApi(url);

    return data.results;
};

// Popular
export const fetchPopularContents = async (mediaType = 'movie', page = 1) => {
    const url = `${BASE_URL}/${mediaType}/popular?language=ko&page=${page}`;
    const data = await fetchFromApi(url);

    return data.results;
};

// Trending (day / week)
export const fetchTrendingContents = async (mediaType = 'movie', timeWindow = 'day') => {
    const url = `${BASE_URL}/trending/${mediaType}/${timeWindow}?language=ko`;
    const data = await fetchFromApi(url);

    return data.results;
};
