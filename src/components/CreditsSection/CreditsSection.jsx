import './CreditsSection.css';

import ProfileCard from './ProfileCard';

const CreditsSection = ({ directors, cast }) => {
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

                {cast?.length > 0 &&
                    cast.map((c) => (
                        <ProfileCard
                            key={c.id}
                            profile_path={c.profile_path}
                            name={c.name}
                            original_name={c.original_name}
                            role={`${c.character} 역`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default CreditsSection;
