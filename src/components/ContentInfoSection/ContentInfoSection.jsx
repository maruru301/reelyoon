import './ContentInfoSection.css';

import Clock from '../../assets/clock.svg';
import Star from '../../assets/star.svg';
import TrailerButton from '../Trailer/TrailerButton';

const ContentInfoSection = ({ details, openTrailer }) => {
    const {
        title,
        name,
        backdrop_path,
        poster_path,
        release_date,
        first_air_date,
        runtime,
        episode_run_time,
        genres,
        overview,
        vote_average,
    } = details;

    const displayTitle = title || name;

    const rawDate = release_date || first_air_date;
    const displayDate = rawDate
        ? new Date(rawDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const backdropUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
        : `https://placehold.co/200x300/777/777`;

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/original${poster_path}`
        : 'https://placehold.co/200x300?text=No+Image';

    const displayRuntime = runtime || (episode_run_time?.[0] ?? null);

    return (
        <div className="content-info-section">
            <div
                className="backdrop"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                }}
            >
                {/* 어두운 오버레이 */}
                <div className="overlay"></div>

                <div className="content-container">
                    <div className="poster">
                        <img src={posterUrl} alt={displayTitle} draggable="false" />
                    </div>

                    <div className="content-info">
                        <h1 className="title">{displayTitle}</h1>

                        <div className="details">
                            <div className="meta-info">
                                <p>{displayDate}</p>

                                {displayRuntime && (
                                    <p className="meta-item">
                                        <img src={Clock} alt="시계 아이콘" />
                                        <span>{displayRuntime}분</span>
                                    </p>
                                )}

                                <p className="meta-item">
                                    <img src={Star} alt="별 아이콘" />
                                    <span>{(vote_average ?? 0).toFixed(1)}</span>
                                </p>
                            </div>

                            <div className="genres">
                                {genres?.length > 0 && genres.map((g) => <p key={g.id}>{g.name}</p>)}
                            </div>
                        </div>

                        <p className="overview">{overview || '줄거리 정보가 없습니다.'}</p>

                        {openTrailer && <TrailerButton onClick={openTrailer} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentInfoSection;
