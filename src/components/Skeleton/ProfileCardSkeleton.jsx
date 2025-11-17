import 'react-loading-skeleton/dist/skeleton.css';
import './ProfileCardSkeleton.css';

import Skeleton from 'react-loading-skeleton';

const ProfileCardSkeleton = () => {
    return (
        <div className="profile-card">
            <div className="content-card">
                <Skeleton width="100%" height="100%" />
            </div>

            <div className="profile-info">
                <p className="name">
                    <Skeleton width={120} height={20} />
                </p>
                <p className="role">
                    <Skeleton width={80} height={16} />
                </p>
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;
