import './SearchResultsSection.css';

import { useEffect, useState } from 'react';

import ContentCard from '../common/ContentCard';
import Pagination from '../common/Pagination';
import { fetchSearchContents } from '../../api/tmdb';
import { useSearchParams } from 'react-router-dom';

const SearchResultsSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const initialFilter = searchParams.get('filter') || 'all'; // URL에서 필터 가져오기
    const [results, setResults] = useState([]); // 전체 검색 결과
    const [filter, setFilter] = useState(initialFilter); // 현재 선택된 필터

    const [currentPage, setCurrentPage] = useState(1); // 현재 선택된 페이지 번호
    const totalPages = 17; // 임시 테스트 데이터

    useEffect(() => {
        if (!query) return;

        // 검색어가 바뀌면 필터를 'all'로 초기화
        setFilter('all');
        setResults([]); // 이전 결과 지우기
        setSearchParams({ query, filter: 'all' });

        const fetchData = async () => {
            try {
                const data = await fetchSearchContents(query);
                setResults(data);
            } catch (err) {
                console.error(`${query} 검색 결과 불러오기 실패:`, err);
                setResults([]);
            }
        };

        fetchData();
    }, [query]);

    // 필터 버튼 클릭 시 상태와 URL 쿼리 업데이트
    const onFilterChange = (newFilter) => {
        setFilter(newFilter);
        setSearchParams({ query, filter: newFilter });
    };

    const filteredResults = results.filter((r) => {
        if (filter === 'all') return true;
        return r.media_type === filter;
    });

    console.log(filteredResults);

    return (
        <div className="search-results-section">
            {/* header - 제목 + 필터 탭 */}
            <div className="search-results-header">
                <h2 className="content-title gradient-text">검색 결과</h2>

                <div className="search-results-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>
                        전체 ({results.length})
                    </button>
                    <button className={filter === 'movie' ? 'active' : ''} onClick={() => onFilterChange('movie')}>
                        영화 ({results.filter((r) => r.media_type === 'movie').length})
                    </button>
                    <button className={filter === 'tv' ? 'active' : ''} onClick={() => onFilterChange('tv')}>
                        TV ({results.filter((r) => r.media_type === 'tv').length})
                    </button>
                </div>
            </div>

            {/* body - 콘텐츠 + Pagination */}
            <div className="search-results-body">
                <div className="search-results-grid">
                    {filteredResults.map((result) => (
                        <ContentCard key={result.id} content={result} mediaType={result.media_type} />
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default SearchResultsSection;
