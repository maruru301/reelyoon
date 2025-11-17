import { fetchRecommendedMovie, fetchRecommendedTv } from '../../../api/detailsApi';
import { useEffect, useState } from 'react';

import ContentGridSection from '../../common/ContentGridSection';

const RecommendedSection = ({ id, type }) => {
    const [recommendedContents, setRecommendedContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecommended = async () => {
            setLoading(true);
            try {
                const data = type === 'movie' ? await fetchRecommendedMovie(id) : await fetchRecommendedTv(id);
                setRecommendedContents(data.slice(0, 14));
            } catch (err) {
                console.error('Recommended 콘텐츠 가져오기 실패:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) getRecommended();
    }, [id, type]);

    return <ContentGridSection title="추천 콘텐츠" loading={loading} contents={recommendedContents} mediaType={type} />;
};

export default RecommendedSection;
