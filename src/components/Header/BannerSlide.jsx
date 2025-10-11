import BannerInfo from './BannerInfo';

const BannerSlide = ({ movie }) => {
    return (
        <>
            <div className="banner-img-container">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
            </div>
            <div className="overlay">
                <BannerInfo movie={movie} />
            </div>
        </>
    );
};
export default BannerSlide;
