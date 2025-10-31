import './ContentDetailSkeleton.css';
import 'react-loading-skeleton/dist/skeleton.css';

import ProfileCardSkeleton from './ProfileCardSkeleton';
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
                    <div className="poster">
                        <Skeleton width="100%" height="100%" borderRadius={16} />
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

            {/* 탭 버튼 */}
            <div className="content-tabs content-tabs-skeleton">
                <Skeleton width={330} height={70} borderRadius={16} />
            </div>

            {/* 탭 콘텐츠 */}
            <div className="credits-section section-skeleton">
                <div className="section-title-skeleton">
                    <Skeleton width={150} height={35} />
                </div>

                {/* 프로필 카드 그리드 */}
                <div className="credits-grid">
                    {[...Array(12)].map((_, i) => (
                        <ProfileCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentDetailSkeleton;
