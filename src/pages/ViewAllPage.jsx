import { fetchPopularContents, fetchTopRatedContents } from '../api/listApi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContentResultsSection from '../components/common/ContentResultsSection';

const ViewAllPage = () => {
    const { mediaType, category } = useParams();
    const navigate = useNavigate();

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const categoryMap = {
        popular: 'Popular',
        'top-rated': 'Top Rated',
    };

    const fetcherMap = {
        popular: fetchPopularContents,
        'top-rated': fetchTopRatedContents,
    };

    const fetchContents = async () => {
        const fetcher = fetcherMap[category];
        if (!fetcher) return;

        setLoading(true);
        try {
            const data = await fetcher(mediaType, currentPage);

            const results = Array.isArray(data) ? data : data.results ?? [];
            setContents(results);
            setTotalPages(data.totalPages ?? 1);
            setTotalResults(data.totalResults ?? results.length);
        } catch (err) {
            console.error('콘텐츠 데이터 가져오기 실패', err);
        } finally {
            setLoading(false);
        }
    };

    // 탭 전환
    const onTabChange = (type) => {
        if (type !== mediaType) {
            navigate(`/${type}/${category}`); // URL 변경
        }
    };

    useEffect(() => {
        fetchContents();
    }, [mediaType, category, currentPage]);

    // 페이지가 바뀔 때 스크롤 맨 위로
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="view-all-page">
            <ContentResultsSection
                title={categoryMap[category]}
                tabs={[
                    { label: '영화', value: 'movie' },
                    { label: 'TV', value: 'tv' },
                ]}
                activeTab={mediaType}
                onTabChange={onTabChange}
                contents={contents}
                totalResults={{ all: totalResults }}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                loading={loading}
            />
        </div>
    );
};

export default ViewAllPage;
