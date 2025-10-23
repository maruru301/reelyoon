import { BASE_URL, fetchFromApi } from './tmdbCommon.js';

// 공통 Content Details
const fetchContentDetails = async (id, type = 'movie') => {
    const url = `${BASE_URL}/${type}/${id}?language=ko`;
    const data = await fetchFromApi(url);

    return data;
};

// 공통 Content Videos (트레일러만)
const fetchContentVideos = async (id, type = 'movie') => {
    const url = `${BASE_URL}/${type}/${id}/videos?language=ko`;
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

export const fetchMovieDetails = (id) => fetchContentDetails(id, 'movie');
export const fetchMovieVideos = (id) => fetchContentVideos(id, 'movie');

export const fetchTvDetails = (id) => fetchContentDetails(id, 'tv');
export const fetchTvVideos = (id) => fetchContentVideos(id, 'tv');
