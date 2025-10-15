import './ContentCardSkeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const ContentCardSkeleton = () => {
    return (
        <div className="content-card">
            <Skeleton height="100%" width="100%" />
        </div>
    );
};

export default ContentCardSkeleton;
