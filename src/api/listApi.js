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

// discover - 장르별 콘텐츠
export const fetchContentsByGenre = async (mediaType = 'movie', genreId, page = 1) => {
    if (!genreId) {
        return { results: [], page: 0, total_pages: 0, total_results: 0 };
    }

    const url = `${BASE_URL}/discover/${mediaType}?language=ko&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`;
    const data = await fetchFromApi(url);

    return {
        results: data.results ?? [],
        page: data.page ?? page,
        totalPages: data.total_pages ?? 0,
        totalResults: data.total_results ?? 0,
    };
};
