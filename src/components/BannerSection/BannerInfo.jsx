import Star from '../../assets/star.svg';
import TrailerButton from '../Trailer/TrailerButton';

const BannerInfo = ({ movie, openTrailer }) => {
    return (
        <div className="banner-info">
            <img
                className="movie-logo"
                src={`https://image.tmdb.org/t/p/original${movie.logoUrl}`}
                alt={`${movie.title} 로고`}
            />

            <h2>{movie.title}</h2>

            <div className="movie-stats">
                <div className="vote-average">
                    <img src={Star} alt="별 아이콘" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div>{movie.runtime}분</div>
                <div>{movie.release_date.slice(0, 4)}</div>
                <div>{movie.genres.map((g) => g.name).join(' · ')}</div>
            </div>

            <p>{movie.overview}</p>

            <TrailerButton trailerKey={movie.trailerKey} onClick={openTrailer} />
        </div>
    );
};
export default BannerInfo;
