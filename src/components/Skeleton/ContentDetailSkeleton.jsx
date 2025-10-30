import './ContentDetailSkeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const ContentDetailSkeleton = () => {
    return (
        <div className="content-detail-skeleton">
            {/* 백드롭 */}
            <div className="backdrop backdrop-skeleton">
                <Skeleton height="100%" width="100%" />

                {/* 컨텐츠 컨테이너 */}
                <div className="content-container-skeleton">
                    {/* 포스터 */}
                    <div className="poster" style={{ width: '50%', minWidth: '300px', maxWidth: '250px' }}>
                        <Skeleton
                            width="100%"
                            height="100%"
                            borderRadius={16}
                            style={{ aspectRatio: '2 / 3', borderRadius: '16px' }}
                        />
                    </div>

                    <div className="content-info">
                        {/* 제목 */}
                        <div className="title">
                            <Skeleton width="50%" height={32} />
                        </div>

                        {/* 세부 정보 */}
                        <div className="details">
                            <Skeleton width={300} height={25} />

                            <div className="genres">
                                <Skeleton width={60} height={25} />
                                <Skeleton width={40} height={25} />
                                <Skeleton width={40} height={25} />
                            </div>
                        </div>

                        {/* 개요 */}
                        <div className="overview">
                            <Skeleton width="100%" height={100} borderRadius={10} />
                        </div>

                        {/* 트레일러 버튼 */}
                        <div className="trailer-button">
                            <Skeleton width={120} height={40} borderRadius={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 탭 버튼 자리 */}
            <div className="skeleton-tabs" style={{ display: 'flex', gap: '10px', marginTop: '2rem' }}>
                <Skeleton width={120} height={36} borderRadius={20} />
                <Skeleton width={120} height={36} borderRadius={20} />
            </div>

            {/* 탭 콘텐츠 자리 */}
            <div className="skeleton-tab-content" style={{ marginTop: '1rem' }}>
                <Skeleton count={4} height={16} style={{ marginBottom: '8px' }} />
            </div>
        </div>
    );
};

export default ContentDetailSkeleton;
