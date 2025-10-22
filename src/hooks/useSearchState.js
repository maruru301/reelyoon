import { useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

const useSearchState = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') || '';
    const filterFromUrl = searchParams.get('filter') || 'all';
    const pageFromUrl = Number(searchParams.get('page')) || 1;

    const [filter, setFilter] = useState(filterFromUrl);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

    // 이전 query를 저장
    const prevQueryRef = useRef(query);

    // 검색어 변경 시 filter 초기화 + 1페이지 이동
    useEffect(() => {
        const prevQuery = prevQueryRef.current;

        // query가 실제로 바뀐 경우에만 filter/page 초기화
        if (query && query !== prevQuery) {
            if (filter !== 'all') setFilter('all');
            setCurrentPage(1);
            setSearchParams({ query, filter: 'all', page: 1 });
        }

        // query 변경 후 prevQuery 업데이트
        prevQueryRef.current = query;
    }, [query]);

    // filter 변경 시 URL 업데이트 + 1페이지 이동
    const updateFilter = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
        setSearchParams({ query, filter: newFilter, page: 1 });
    };

    // currentPage 변경 시 URL 업데이트
    const updatePage = (newPage) => {
        setCurrentPage(newPage);
        setSearchParams({ query, filter, page: newPage });
    };

    return { query, filter, currentPage, updateFilter, updatePage };
};

export default useSearchState;
