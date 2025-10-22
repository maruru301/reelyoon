import './SearchResultsSection.css';

import { useEffect, useMemo, useState } from 'react';

import SearchResultsBody from './SearchResultsBody';
import SearchResultsHeader from './SearchResultsHeader';
import useSearchResults from '../../hooks/useSearchResults';
import useSearchState from '../../hooks/useSearchState';

const SearchResultsSection = () => {
    const { query, filter, currentPage, updateFilter, updatePage } = useSearchState();
    const [blockSize, setBlockSize] = useState(5);
    const [sortOption, setSortOption] = useState('latest'); // 정렬 상태

    const { results, totalMovieResults, totalTvResults, totalPages } = useSearchResults(query, filter, currentPage);

    // 정렬된 결과 (최신순 / 평점순)
    const sortedResults = useMemo(() => {
        if (!results) return [];

        const sorted = [...results];
        if (sortOption === 'latest') {
            sorted.sort((a, b) => {
                // 최신순
                const dateA = new Date(a.release_date || a.first_air_date || 0);
                const dateB = new Date(b.release_date || b.first_air_date || 0);
                return dateB - dateA;
            });
        } else if (sortOption === 'rating') {
            // 평점순
            sorted.sort((a, b) => b.vote_average - a.vote_average);
        }

        return sorted;
    }, [results, sortOption]);

    // 정렬 변경 시 1페이지로 이동
    const onSortChange = (newSort) => {
        setSortOption(newSort);
        if (currentPage !== 1) updatePage(1);
    };

    // query 또는 filter가 변경되면 정렬 옵션 초기화
    useEffect(() => {
        setSortOption('latest');
    }, [query, filter]);

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);
        updateBlockSize();
        window.addEventListener('resize', updateBlockSize);
        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    // 페이지 또는 검색어 변경 시 스크롤 위로
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, query]);

    return (
        <div className="search-results-section">
            {/* header - 제목 + 필터 탭 */}
            <SearchResultsHeader
                filter={filter}
                onFilterChange={updateFilter}
                totalMovieResults={totalMovieResults}
                totalTvResults={totalTvResults}
                sortOption={sortOption}
                onSortChange={onSortChange}
            />

            {/* body - 콘텐츠 + Pagination */}
            <SearchResultsBody
                results={sortedResults}
                currentPage={currentPage}
                totalPages={totalPages}
                blockSize={blockSize}
                onPageChange={updatePage}
            />
        </div>
    );
};

export default SearchResultsSection;
