import './SearchResultsSection.css';

import { useEffect, useState } from 'react';

import SearchResultsBody from './SearchResultsBody';
import SearchResultsHeader from './SearchResultsHeader';
import useSearchResults from '../../hooks/useSearchResults';
import useSearchState from '../../hooks/useSearchState';

const SearchResultsSection = () => {
    const { query, filter, currentPage, updateFilter, updatePage } = useSearchState();
    const [blockSize, setBlockSize] = useState(5);

    const { results, totalMovieResults, totalTvResults, totalPages } = useSearchResults(query, filter, currentPage);

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
            />

            {/* body - 콘텐츠 + Pagination */}
            <SearchResultsBody
                results={results}
                currentPage={currentPage}
                totalPages={totalPages}
                blockSize={blockSize}
                onPageChange={updatePage}
            />
        </div>
    );
};

export default SearchResultsSection;
