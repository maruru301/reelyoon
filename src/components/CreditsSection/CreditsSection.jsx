import './CreditsSection.css';

const CreditsSection = ({ directors, cast }) => {
    const getProfileUrl = (path) =>
        path ? `https://image.tmdb.org/t/p/original${path}` : 'https://placehold.co/200x300?text=No+Image';

    return (
        <div className="credits-section">
            <h2 className="content-title gradient-text">Cast & Crew</h2>

            <div className="credits-grid">
                {directors?.length > 0 &&
                    directors.map((d) => (
                        <div key={d.id} className="profile-card">
                            <img
                                src={getProfileUrl(d.profile_path)}
                                alt={`${d.name} (${d.original_name})`}
                                draggable="false"
                            />

                            <div className="profile-info">
                                <p className="name">
                                    {d.name}
                                    {d.name !== d.original_name && ` (${d.original_name})`}
                                </p>
                                <p className="role">{d.job}</p>
                            </div>
                        </div>
                    ))}

                {cast?.length > 0 &&
                    cast.map((c) => (
                        <div key={c.id} className="profile-card">
                            <img src={getProfileUrl(c.profile_path)} alt={c.name} draggable="false" />

                            <div className="profile-info">
                                <p className="name">
                                    {c.name}
                                    {c.name !== c.original_name && ` (${c.original_name})`}
                                </p>
                                <p className="role">{c.character} 역</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CreditsSection;
