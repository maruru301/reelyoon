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

    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState(initialFilter); // 현재 선택된 필터

    const [currentPage, setCurrentPage] = useState(1); // 현재 선택된 페이지 번호
    const [totalPages, setTotalPages] = useState(1); // 총 페이지

    const [totalMovieResults, setTotalMovieResults] = useState(0); // 영화 컨텐츠 총 개수
    const [totalTvResults, setTotalTvResults] = useState(0); // TV 컨텐츠 총 개수

    const [blockSize, setBlockSize] = useState(5);

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);

        updateBlockSize(); // 초기값 설정
        window.addEventListener('resize', updateBlockSize);

        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    // query가 바뀔 때만 초기화
    useEffect(() => {
        if (!query) return;

        setFilter('all'); //필터를 'all'로 초기화
        setResults([]);
        setCurrentPage(1); // 검색어 변경 시 페이지 초기화
        setSearchParams({ query, filter: 'all' });
    }, [query]);

    // 데이터 fetch
    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            try {
                const { results, totalPages, totalMovieResults, totalTvResults } = await fetchSearchContents(
                    query,
                    currentPage
                );

                setResults(results);
                setTotalPages(totalPages);
                setTotalMovieResults(totalMovieResults);
                setTotalTvResults(totalTvResults);
            } catch (err) {
                console.error(`${query} 검색 결과 불러오기 실패:`, err);
                setResults([]);
                setTotalPages(1);
                setTotalMovieResults(0);
                setTotalTvResults(0);
            }
        };

        fetchData();
    }, [query, currentPage]);

    // 페이지 바뀌면 스크롤 위로 이동
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // 필터 버튼 클릭 시 상태와 URL 쿼리 업데이트
    const onFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // 탭 바뀔 때 1페이지로
        setSearchParams({ query, filter: newFilter });
    };

    const filteredResults = filter === 'all' ? results : results.filter((r) => r.media_type === filter);

    return (
        <div className="search-results-section">
            {/* header - 제목 + 필터 탭 */}
            <div className="search-results-header">
                <h2 className="content-title gradient-text">검색 결과</h2>

                <div className="search-results-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>
                        전체 ({totalMovieResults + totalTvResults})
                    </button>
                    <button className={filter === 'movie' ? 'active' : ''} onClick={() => onFilterChange('movie')}>
                        영화 ({totalMovieResults})
                    </button>
                    <button className={filter === 'tv' ? 'active' : ''} onClick={() => onFilterChange('tv')}>
                        TV ({totalTvResults})
                    </button>
                </div>
            </div>

            {/* body - 콘텐츠 + Pagination */}
            <div className="search-results-body">
                <div className="pagination-info">{`${currentPage}/${totalPages} 페이지`}</div>

                <div className="search-results-grid">
                    {filteredResults.map((result) => (
                        <ContentCard key={result.id} content={result} mediaType={result.media_type} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    blockSize={blockSize}
                />
            </div>
        </div>
    );
};

export default SearchResultsSection;
