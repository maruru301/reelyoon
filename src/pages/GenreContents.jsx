import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ContentCard from '../components/common/ContentCard';
import Pagination from '../components/Pagination/Pagination';
import { fetchContentsByGenre } from '../api/listApi';

const GenreContents = () => {
    const { mediaType, genreId } = useParams();
    const { state } = useLocation();

    const genreName = state?.genreName;

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const [blockSize, setBlockSize] = useState(5);

    // 장르별 콘텐츠 불러오기
    const loadContents = async (page = 1) => {
        try {
            setLoading(true);

            const { results, currentPage, totalPages, totalResults } = await fetchContentsByGenre(
                mediaType,
                genreId,
                page
            );

            setContents(results);
            setCurrentPage(currentPage);
            setTotalPages(totalPages);
            setTotalResults(totalResults);
        } catch (err) {
            console.error('장르별 콘텐츠 가져오기 실패', err);
        } finally {
            setLoading(false);
        }
    };

    // 첫 로드
    useEffect(() => {
        if (genreId) loadContents(1);
    }, [genreId, mediaType]);

    // 페이지 변경 핸들러
    const onPageChange = (newPage) => {
        if (newPage !== currentPage) {
            loadContents(newPage);

            window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 바뀔 때 위로 스크롤
        }
    };

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);
        updateBlockSize();
        window.addEventListener('resize', updateBlockSize);
        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    if (loading) return <div style={{ padding: '10rem' }}>로딩 중...</div>;

    return (
        <div className="search-results-section">
            <div className="search-results-header">
                <div className="search-results-title-tabs">
                    <h1 className="content-title gradient-text">"{genreName}" 장르</h1>

                    <div>총 {totalResults} 개의 결과</div>
                </div>
            </div>

            <div className="search-results-body">
                <div className="pagination-info">{`${currentPage}/${totalPages} 페이지`}</div>

                {contents.length === 0 ? (
                    <p>표시할 콘텐츠가 없습니다.</p>
                ) : (
                    <div className="search-results-grid">
                        {contents.map((content) => (
                            <div key={content.id}>
                                <ContentCard content={content} mediaType={mediaType} />
                            </div>
                        ))}
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    blockSize={blockSize}
                />
            </div>
        </div>
    );
};

export default GenreContents;
