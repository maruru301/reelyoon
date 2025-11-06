import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ContentCard from '../components/common/ContentCard';
import { fetchContentsByGenre } from '../api/listApi';

const GenreContents = () => {
    const { mediaType, genreId } = useParams();
    const { state } = useLocation();

    const genreName = state?.genreName;

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const loadContents = async () => {
            try {
                setLoading(true);

                const { results, page, totalPages, totalResults } = await fetchContentsByGenre(mediaType, genreId);
                setContents(results);
                setCurrentPage(page);
                setTotalPage(totalPages);
                setTotalResults(totalResults);
            } catch (err) {
                console.error('장르별 콘텐츠 가져오기 실패', err);
            } finally {
                setLoading(false);
            }
        };

        if (genreId) loadContents();
    }, [genreId]);

    if (loading) return <div style={{ padding: '10rem' }}>로딩 중...</div>;

    return (
        <div style={{ padding: '10rem' }}>
            <h1 className="content-title gradient-text">"{genreName}" 장르</h1>
            <div>현재 페이지 {currentPage}</div>
            <div>총 {totalPage} 페이지</div>
            <div>총 {totalResults} 개의 결과</div>

            {contents.length === 0 ? (
                <p>표시할 콘텐츠가 없습니다.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {contents.map((content) => (
                        <div key={content.id}>
                            <ContentCard content={content} mediaType={mediaType} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreContents;
