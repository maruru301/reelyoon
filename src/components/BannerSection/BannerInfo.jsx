import Info from '../../assets/info.svg';
import Star from '../../assets/star.svg';
import TrailerButton from '../Trailer/TrailerButton';
import { formatContentData } from '../../utils/formatContentData';
import { useNavigate } from 'react-router-dom';

const BannerInfo = ({ movie, openTrailer }) => {
    const navigate = useNavigate();

    const { displayTitle, releaseYear, displayRuntime } = formatContentData(movie);

    return (
        <div className="banner-info">
            <img
                className="movie-logo"
                src={`https://image.tmdb.org/t/p/original${movie.logoUrl}`}
                alt={`${displayTitle} 로고`}
            />

            <div className="movie-stats">
                <div className="meta-item">
                    <img src={Star} alt="별 아이콘" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div>{displayRuntime}분</div>
                <div>{releaseYear}</div>
                <div>{movie.genres.map((g) => g.name).join(' · ')}</div>
            </div>

            <p>{movie.overview}</p>

            <div className="button-section">
                <TrailerButton trailerKey={movie.trailerKey} onClick={openTrailer} />
                <button className="common-btn" onClick={() => navigate(`/movie/${movie.id}`)}>
                    <img src={Info} alt="정보 버튼" />
                    <span>더보기</span>
                </button>
            </div>
        </div>
    );
};
export default BannerInfo;
