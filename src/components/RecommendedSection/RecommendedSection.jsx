import './RecommendedSection.css';

import { fetchRecommendedMovie, fetchRecommendedTv } from '../../api/detailsApi';
import { useEffect, useState } from 'react';

import ContentCard from '../common/ContentCard';

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

    return (
        <div className="recommended-section">
            <h2 className="content-title gradient-text">추천 콘텐츠</h2>

            {loading ? (
                <p>로딩 중...</p>
            ) : recommendedContents.length === 0 ? (
                <p className="empty-message">조금만 기다려 주세요, 추천 콘텐츠 준비 중입니다 …</p>
            ) : (
                <div className="recommended-grid">
                    {recommendedContents.map((s) => (
                        <ContentCard key={s.id} content={s} mediaType={type} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendedSection;
