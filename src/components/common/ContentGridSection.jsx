import './ContentGridSection.css';

import ContentCard from './ContentCard';
import ContentCardSkeleton from '../Skeleton/ContentCardSkeleton';

const ContentGridSection = ({ title, loading, contents, mediaType }) => {
    return (
        <div className="content-grid-section">
            <h2 className="content-title gradient-text">{title}</h2>

            {loading ? (
                <div className="content-grid">
                    {[...Array(8)].map((_, i) => (
                        <ContentCardSkeleton key={i} />
                    ))}
                </div>
            ) : !contents || contents.length === 0 ? (
                <p className="empty-message">콘텐츠 정보를 불러올 수 없습니다.</p>
            ) : (
                <div className="content-grid">
                    {contents.map((item) => (
                        <ContentCard key={item.id} content={item} mediaType={mediaType} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentGridSection;
