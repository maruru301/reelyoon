import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

const useQueryFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const initialFilter = searchParams.get('filter') || 'all';

    const [filter, setFilter] = useState(initialFilter);

    // 검색어 변경 시 filter 초기화
    useEffect(() => {
        if (!query) return;

        if (filter !== 'all') {
            setFilter('all');
            setSearchParams({ query, filter: 'all' });
        }
    }, [query]);

    // 필터 업데이트 함수
    const updateFilter = (newFilter) => {
        setFilter(newFilter);
        setSearchParams({ query, filter: newFilter });
    };

    return { query, filter, updateFilter };
};

export default useQueryFilter;
