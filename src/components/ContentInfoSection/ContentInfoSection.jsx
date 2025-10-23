import './ContentInfoSection.css';

import { fetchMovieDetails, fetchTvDetails } from '../../api/detailsApi';
import { useEffect, useState } from 'react';

import Star from '../../assets/star.svg';
import { useParams } from 'react-router-dom';

const ContentInfoSection = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);

            try {
                const data = type === 'movie' ? await fetchMovieDetails(id) : await fetchTvDetails(id);
                setDetails(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (id && type) getDetails();
    }, [id, type]);

    if (loading) return <p>로딩 중...</p>;
    if (!details) return <p>데이터를 불러올 수 없습니다.</p>;

    console.log(details);

    const {
        title,
        name,
        backdrop_path,
        poster_path,
        release_date,
        first_air_date,
        runtime,
        genres,
        overview,
        vote_average,
    } = details;

    const displayTitle = title || name;

    const displayDate = release_date || first_air_date;

    const backdropUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
        : `https://placehold.co/200x300/777/777`;

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/original${poster_path}`
        : 'https://placehold.co/200x300?text=No+Image';

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

                    <div className="info">
                        <h1 className="title">{displayTitle}</h1>

                        <div className="meta">
                            <p>{displayDate}</p>
                            <p className="vote-average">
                                <img src={Star} alt="별 아이콘" />
                                <span>{(vote_average ?? 0).toFixed(1)}</span>
                            </p>
                            {runtime && <p>{runtime}분</p>}
                            {genres?.length > 0 && <p>{genres.map((g) => g.name).join(' · ')}</p>}
                        </div>

                        <p className="overview">{overview || '줄거리 정보가 없습니다.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentInfoSection;
