import './SearchResultsSection.css';

import { fetchSearchAll, fetchSearchMovies, fetchSearchTv } from '../../api/searchApi';
import { useEffect, useState } from 'react';

import ContentCard from '../common/ContentCard';
import Pagination from '../common/Pagination';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 20;

const SearchResultsSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const initialFilter = searchParams.get('filter') || 'all';

    const [filter, setFilter] = useState(initialFilter);
    const [results, setResults] = useState([]);

    const [totalMovieResults, setTotalMovieResults] = useState(0);
    const [totalTvResults, setTotalTvResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [blockSize, setBlockSize] = useState(5);

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);
        updateBlockSize();
        window.addEventListener('resize', updateBlockSize);
        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    // 검색어 바뀔 때 초기화
    useEffect(() => {
        if (!query) return;

        setFilter('all');
        setCurrentPage(1);

        // 이미 filter 파라미터가 'all'이면 중복 업데이트 방지
        const currentFilter = searchParams.get('filter');
        if (currentFilter !== 'all') {
            setSearchParams({ query, filter: 'all' });
        }
    }, [query]);

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
    }, [query, currentPage, filter]);

    // 페이지 바뀌면 스크롤 위로
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // 필터 버튼 클릭 시 상태와 URL 쿼리 업데이트
    const onFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // 탭 바뀔 때 1페이지로
        setSearchParams({ query, filter: newFilter });
    };

    const totalPages =
        filter === 'movie'
            ? Math.ceil(totalMovieResults / ITEMS_PER_PAGE)
            : filter === 'tv'
            ? Math.ceil(totalTvResults / ITEMS_PER_PAGE)
            : Math.ceil((totalMovieResults + totalTvResults) / ITEMS_PER_PAGE);

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
                    {results.map((result) => (
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
