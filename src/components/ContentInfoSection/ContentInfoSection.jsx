import './ContentInfoSection.css';

import Clock from '../../assets/clock.svg';
import MetaItem from '../common/MetaItem';
import Star from '../../assets/star.svg';
import TrailerButton from '../Trailer/TrailerButton';
import { formatContentData } from '../../utils/formatContentData';
import { getDDay } from '../../utils/getDDay';
import { useNavigate } from 'react-router-dom';

const ContentInfoSection = ({ details, openTrailer, type }) => {
    const navigate = useNavigate();

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
                                <div>{displayDate}</div>

                                {displayRuntime && (
                                    <MetaItem icon={Clock} alt={'시계 아이콘'}>
                                        {displayRuntime}분
                                    </MetaItem>
                                )}

                                <MetaItem icon={Star} alt={'별 아이콘'}>
                                    {vote_average ? vote_average.toFixed(1) : '-'}
                                </MetaItem>
                            </div>

                            <div className="genres">
                                {genres?.length > 0 &&
                                    genres.map((g) => (
                                        <div
                                            key={g.id}
                                            className="genre-badge"
                                            onClick={() =>
                                                navigate(`/${type}/genre/${g.id}`, {
                                                    state: { genreName: g.name },
                                                })
                                            }
                                        >
                                            {g.name}
                                        </div>
                                    ))}
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
