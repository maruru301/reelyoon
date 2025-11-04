import './ContentInfoSection.css';

import Clock from '../../assets/clock.svg';
import Star from '../../assets/star.svg';
import TrailerButton from '../Trailer/TrailerButton';
import { formatContentData } from '../../utils/formatContentData';
import { getDDay } from '../../utils/getDDay';

const ContentInfoSection = ({ details, openTrailer }) => {
    const { genres, overview, vote_average, tagline, ratingKR } = details;

    const { displayTitle, rawDate, displayDate, displayRuntime, backdropUrl, posterUrl } = formatContentData(details);

    const dDay = getDDay(rawDate);

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

                        {dDay && <span className="d-day-badge">{dDay}</span>}
                    </div>

                    <div className="content-info">
                        <h1 className="title">
                            {displayTitle}
                            {ratingKR && <span className={`rating-badge rating-${ratingKR}`}>{ratingKR}</span>}
                        </h1>

                        {tagline && <p className="tagline">"{tagline}"</p>}

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
                                    <span>{vote_average ? vote_average.toFixed(1) : '-'}</span>
                                </p>
                            </div>

                            <div className="genres">
                                {genres?.length > 0 && genres.map((g) => <p key={g.id}>{g.name}</p>)}
                            </div>
                        </div>

                        <p className="overview">{overview || '줄거리 정보가 없습니다.'}</p>

                        <div>{openTrailer && <TrailerButton onClick={openTrailer} />}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentInfoSection;
