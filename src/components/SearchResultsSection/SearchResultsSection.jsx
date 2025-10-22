import './SearchResultsSection.css';

import { useEffect, useState } from 'react';

import SearchResultsBody from './SearchResultsBody';
import SearchResultsHeader from './SearchResultsHeader';
import useQueryFilter from '../../hooks/useQueryFilter';
import useSearchResults from '../../hooks/useSearchResults';

const SearchResultsSection = () => {
    const { query, filter, updateFilter } = useQueryFilter();
    const [currentPage, setCurrentPage] = useState(1);
    const [blockSize, setBlockSize] = useState(5);

    const { results, totalMovieResults, totalTvResults, totalPages } = useSearchResults(query, filter, currentPage);

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);
        updateBlockSize();
        window.addEventListener('resize', updateBlockSize);
        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    // 페이지 바뀌면 스크롤 위로
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, query]);

    // 필터 변경 시 페이지 1로 초기화
    const onFilterChange = (newFilter) => {
        updateFilter(newFilter);
        setCurrentPage(1);
    };

    // query 변경 시 1페이지로 초기화
    useEffect(() => {
        if (currentPage !== 1) setCurrentPage(1);
    }, [query]);

    return (
        <div className="search-results-section">
            {/* header - 제목 + 필터 탭 */}
            <SearchResultsHeader
                filter={filter}
                onFilterChange={onFilterChange}
                totalMovieResults={totalMovieResults}
                totalTvResults={totalTvResults}
            />

            {/* body - 콘텐츠 + Pagination */}
            <SearchResultsBody
                results={results}
                currentPage={currentPage}
                totalPages={totalPages}
                blockSize={blockSize}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default SearchResultsSection;
