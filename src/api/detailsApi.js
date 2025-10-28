import { BASE_URL, fetchFromApi } from './tmdbCommon.js';

// 공통 Content Details
const fetchContentDetails = async (id, type = 'movie') => {
    const url = `${BASE_URL}/${type}/${id}?language=ko&append_to_response=credits`;
    const data = await fetchFromApi(url);

    // 감독 정보
    let directors = [];
    if (type === 'movie') {
        directors = data.credits?.crew?.filter((m) => m.job === 'Director') ?? [];
    } else if (type === 'tv') {
        directors =
            data.created_by?.map((c) => ({
                id: c.id,
                name: c.name,
                original_name: c.original_name,
                profile_path: c.profile_path,
                job: 'Creator',
            })) ?? [];
    }

    // 출연진 정보 (상위 몇 명만)
    const cast = data.credits?.cast ?? [];

    return {
        ...data,
        directors,
        cast,
    };
};

// 공통 Content Videos (트레일러만)
const fetchContentVideos = async (id, type = 'movie') => {
    let url = `${BASE_URL}/${type}/${id}/videos?language=ko`;
    let data = await fetchFromApi(url);

    // 트레일러만 필터링
    let trailers = data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');

    // 한국어 트레일러가 없으면 영어로
    if (trailers.length === 0) {
        url = `${BASE_URL}/${type}/${id}/videos?language=en-US`;
        data = await fetchFromApi(url);

        trailers = data.results.filter((video) => video.type === 'Trailer' && video.site === 'YouTube');
    }

    return trailers;
};

// 공통 Content Recommendations
const fetchRecommendedContent = async (id, type = 'movie') => {
    const url = `${BASE_URL}/${type}/${id}/similar?language=ko&page=1`;
    const data = await fetchFromApi(url);

    return data.results ?? [];
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

export const fetchRecommendedMovie = (id) => fetchRecommendedContent(id, 'movie');
export const fetchRecommendedTv = (id) => fetchRecommendedContent(id, 'tv');
