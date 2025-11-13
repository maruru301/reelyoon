import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ContentResultsSection from '../components/common/ContentResultsSection';
import { fetchContentsByGenre } from '../api/listApi';

const GenreContents = () => {
    const { mediaType, genreId, genreSlug } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const genreName = state?.genreName ?? genreSlug.replace(/-and-/g, ' & ');

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const [sortBy, setSortBy] = useState('popularity.desc');

    // 탭 전환
    const onTabChange = (type) => {
        if (type !== mediaType) {
            navigate(`/${type}/genre/${genreId}/${genreSlug}`, { state }); // URL 변경
        }
    };

    // 장르별 콘텐츠 불러오기
    const loadContents = async (page = 1, sortOption = sortBy) => {
        try {
            setLoading(true);

            const { results, currentPage, totalPages, totalResults } = await fetchContentsByGenre(
                mediaType,
                genreId,
                page,
                sortOption
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

    // 첫 로드 & 정렬 변경 시
    useEffect(() => {
        if (genreId) loadContents(1, sortBy);
    }, [genreId, mediaType, sortBy]);

    // 페이지 변경 핸들러
    const onPageChange = (newPage) => {
        if (newPage !== currentPage) {
            loadContents(newPage);

            window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 바뀔 때 위로 스크롤
        }
    };

    const onSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1); // 첫 페이지로 리셋
    };

    return (
        <ContentResultsSection
            title={`"${genreName}" 장르`}
            totalResults={{
                all: totalResults, // 혹시나 내부에서 all 탭 대비용
                movie: mediaType === 'movie' ? totalResults : 0,
                tv: mediaType === 'tv' ? totalResults : 0,
            }}
            tabs={[
                { label: '영화', value: 'movie' },
                { label: 'TV', value: 'tv' },
            ]}
            activeTab={mediaType}
            onTabChange={onTabChange}
            sortOption={sortBy}
            onSortChange={onSortChange}
            contents={contents}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            loading={loading}
        />
    );
};

export default GenreContents;
