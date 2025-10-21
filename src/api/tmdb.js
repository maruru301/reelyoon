const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const ITEMS_PER_PAGE = 20;

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

// Search Movies
export const fetchSearchMovies = async (query, page = 1) => {
    if (!query) return { results: [], totalResults: 0, totalPages: 0 };

    try {
        const res = await fetch(
            `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=ko&page=${page}`,
            options
        );
        const data = await res.json();

        return {
            results: data.results.map((item) => ({ ...item, media_type: 'movie' })),
            totalResults: data.total_results,
            totalPages: data.total_pages,
        };
    } catch (err) {
        console.error('Movie API 실패:', err);
        return { results: [], totalResults: 0, totalPages: 0 };
    }
};

// Search TV
export const fetchSearchTv = async (query, page = 1) => {
    if (!query) return { results: [], totalResults: 0, totalPages: 0 };

    try {
        const res = await fetch(
            `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=ko&page=${page}`,
            options
        );
        const data = await res.json();

        return {
            results: data.results.map((item) => ({ ...item, media_type: 'tv' })),
            totalResults: data.total_results,
            totalPages: data.total_pages,
        };
    } catch (err) {
        console.error('TV API 실패:', err);
        return { results: [], totalResults: 0, totalPages: 0 };
    }
};

// Search All (Movies + TV)
export const fetchSearchAll = async (query, page = 1) => {
    if (!query) return { results: [], totalMovieResults: 0, totalTvResults: 0, totalPages: 0 };

    try {
        // 1페이지 fetch로 전체 개수 확인
        const [movieDataFirst, tvDataFirst] = await Promise.all([fetchSearchMovies(query, 1), fetchSearchTv(query, 1)]);

        const totalMovieResults = movieDataFirst.totalResults;
        const totalTvResults = tvDataFirst.totalResults;
        const totalResults = totalMovieResults + totalTvResults;
        const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

        // UI 페이지 기준
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE - 1;

        let results = [];

        // 영화 데이터
        if (startIndex < totalMovieResults) {
            const movieStart = startIndex;
            const movieEnd = Math.min(endIndex, totalMovieResults - 1);

            const firstMoviePage = Math.floor(movieStart / ITEMS_PER_PAGE) + 1;
            const lastMoviePage = Math.floor(movieEnd / ITEMS_PER_PAGE) + 1;

            let movieResults = [];

            for (let p = firstMoviePage; p <= lastMoviePage; p++) {
                const pageData = await fetchSearchMovies(query, p);
                movieResults.push(...pageData.results);
            }

            const movieOffset = movieStart % ITEMS_PER_PAGE;
            results.push(...movieResults.slice(movieOffset, movieOffset + (movieEnd - movieStart + 1)));
        }

        // TV 데이터
        const tvStart = Math.max(startIndex - totalMovieResults, 0);
        if (tvStart < totalTvResults) {
            const tvEnd = endIndex - totalMovieResults;

            const firstTvPage = Math.floor(tvStart / ITEMS_PER_PAGE) + 1;
            const lastTvPage = Math.floor(tvEnd / ITEMS_PER_PAGE) + 1;

            let tvResults = [];

            for (let p = firstTvPage; p <= lastTvPage; p++) {
                const pageData = await fetchSearchTv(query, p);
                tvResults.push(...pageData.results);
            }

            const tvOffset = tvStart % ITEMS_PER_PAGE;
            const tvNeeded = endIndex - startIndex + 1 - results.length;
            results.push(...tvResults.slice(tvOffset, tvOffset + tvNeeded));
        }

        return {
            results,
            totalMovieResults,
            totalTvResults,
            totalPages,
        };
    } catch (err) {
        console.error('전체 검색 실패:', err);
        return { results: [], totalMovieResults: 0, totalTvResults: 0, totalPages: 0 };
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
