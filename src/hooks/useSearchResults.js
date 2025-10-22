import { fetchSearchAll, fetchSearchMovies, fetchSearchTv } from '../api/searchApi';
import { useEffect, useState } from 'react';

import { ITEMS_PER_PAGE } from '../api/tmdbCommon';

const useSearchResults = (query, filter, currentPage) => {
    const [results, setResults] = useState([]); // 콘텐츠
    const [totalMovieResults, setTotalMovieResults] = useState(0); // 영화 총 개수
    const [totalTvResults, setTotalTvResults] = useState(0); // TV 총 개수

    // 데이터 fetch
    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            try {
                let data;

                if (filter === 'movie') {
                    data = await fetchSearchMovies(query, currentPage);
                    setResults(data.results);
                    setTotalMovieResults(data.totalResults); // 전체값 유지
                } else if (filter === 'tv') {
                    data = await fetchSearchTv(query, currentPage);
                    setResults(data.results);
                    setTotalTvResults(data.totalResults);
                } else {
                    data = await fetchSearchAll(query, currentPage);
                    setResults(data.results);
                    setTotalMovieResults(data.totalMovieResults);
                    setTotalTvResults(data.totalTvResults);
                }
            } catch (err) {
                console.error('검색 실패:', err);
                setResults([]);
            }
        };

        fetchData();
    }, [query, filter, currentPage]);

    // 전체 페이지 수
    const totalPages =
        filter === 'movie'
            ? Math.ceil(totalMovieResults / ITEMS_PER_PAGE)
            : filter === 'tv'
            ? Math.ceil(totalTvResults / ITEMS_PER_PAGE)
            : Math.ceil((totalMovieResults + totalTvResults) / ITEMS_PER_PAGE);

    return { results, totalMovieResults, totalTvResults, totalPages };
};

export default useSearchResults;
