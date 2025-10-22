export const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const ITEMS_PER_PAGE = 20;

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    },
};

// 공통 fetch 함수
export const fetchFromApi = async (url) => {
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('TMDB API 호출 실패:', err);
        return null;
    }
};
