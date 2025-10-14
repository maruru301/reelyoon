import PlayBtn from '../../assets/play-btn.svg';
import Star from '../../assets/star.svg';

const BannerInfo = ({ movie, openTrailer }) => {
    return (
        <div className="movie-info">
            <h2 className="gradient-text">{movie.title}</h2>

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

            <button className="play-btn" onClick={() => openTrailer(movie)}>
                <img src={PlayBtn} alt="재생 버튼" />
                <span>Play</span>
            </button>
        </div>
    );
};
export default BannerInfo;
