import { BASE_URL, fetchFromApi } from './tmdbCommon.js';

// Movie Details
export const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?language=ko`;
    const data = await fetchFromApi(url);

    return data;
};

// Movie Videos (Trailer)
export const fetchMovieVideos = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/videos?language=ko`;
    const data = await fetchFromApi(url);

    // 트레일러만 필터링
    const trailers = data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');

    return trailers;
};

// Movie Images
export const fetchMovieImages = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/images?include_image_language=en-US`;
    const data = await fetchFromApi(url);

    return data;
};
