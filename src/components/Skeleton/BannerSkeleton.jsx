import 'react-loading-skeleton/dist/skeleton.css';
import './BannerSkeleton.css';

import Skeleton from 'react-loading-skeleton';

const BannerSkeleton = () => {
    return (
        <div className="banner-skeleton">
            <Skeleton height={'100%'} />

            <div className="content-info">
                <Skeleton className="title-skeleton" width="50%" borderRadius={10} />
                <Skeleton width="40%" height={20} borderRadius={10} />
                <Skeleton className="overview-skeleton" height={50} borderRadius={10} />
                <Skeleton className="btn-skeleton" width={'6rem'} height={40} borderRadius={20} />
            </div>
        </div>
    );
};
export default BannerSkeleton;
