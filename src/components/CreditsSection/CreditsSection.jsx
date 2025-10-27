import './CreditsSection.css';

import ProfileCard from './ProfileCard';
import { useState } from 'react';

const CreditsSection = ({ directors, cast }) => {
    const [showAllCast, setShowAllCast] = useState(false);

    const visibleCast = showAllCast ? cast : cast.slice(0, 10);

    return (
        <div className="credits-section">
            <h2 className="content-title gradient-text">Cast & Crew</h2>

            <div className="credits-grid">
                {directors?.length > 0 &&
                    directors.map((d) => (
                        <ProfileCard
                            key={d.id}
                            profile_path={d.profile_path}
                            name={d.name}
                            original_name={d.original_name}
                            role={d.job}
                        />
                    ))}

                {visibleCast?.length > 0 &&
                    visibleCast.map((c) => (
                        <ProfileCard
                            key={c.id}
                            profile_path={c.profile_path}
                            name={c.name}
                            original_name={c.original_name}
                            role={`${c.character} 역`}
                        />
                    ))}

                {cast?.length > 10 && (
                    <div className="show-more-card" onClick={() => setShowAllCast((prev) => !prev)}>
                        <span>{showAllCast ? '접기 ▲' : '더보기 ▼'}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreditsSection;
