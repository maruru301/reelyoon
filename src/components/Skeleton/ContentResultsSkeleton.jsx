import './ContentResultsSkeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';

import ContentCardSkeleton from './ContentCardSkeleton';
import Skeleton from 'react-loading-skeleton';

const ContentResultsSkeleton = () => {
    return (
        <div className="content-results-section">
            <div className="content-results-header">
                <div className="content-results-title-tabs">
                    <div className="title-skeleton">
                        <Skeleton width="80%" height={45} />
                    </div>

                    <Skeleton width={150} height={16} />
                    <div className="content-results-tabs">
                        <Skeleton width={40} height={20} />
                        <Skeleton width={40} height={20} />
                    </div>
                </div>

                <div className="content-sort-select-skeleton">
                    <Skeleton width="100%" height={40} />
                </div>
            </div>
            <div className="content-results-body">
                <div className="content-results-grid">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <ContentCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentResultsSkeleton;
