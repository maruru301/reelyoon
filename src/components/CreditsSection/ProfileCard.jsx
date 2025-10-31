import './ProfileCard.css';

import ProfileCardSkeleton from '../Skeleton/ProfileCardSkeleton';
import { useState } from 'react';

const ProfileCard = ({ profile_path, name, original_name, role }) => {
    const [imgLoaded, setImgLoaded] = useState(!profile_path);

    const getProfileUrl = (path) =>
        path ? `https://image.tmdb.org/t/p/original${path}` : 'https://placehold.co/200x300?text=No+Image';

    return (
        <div className="profile-card">
            {!imgLoaded && <ProfileCardSkeleton />}

            <img
                src={getProfileUrl(profile_path)}
                alt={`${name} (${original_name})`}
                draggable="false"
                onLoad={() => setImgLoaded(true)}
                className={`profile-img ${imgLoaded ? 'loaded' : ''}`}
            />

            {imgLoaded && (
                <div className="profile-info">
                    <p className="name">
                        {name}
                        {name !== original_name && ` (${original_name})`}
                    </p>
                    <p className="role">{role}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
