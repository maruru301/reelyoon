import BannerInfo from './BannerInfo';
import { formatContentData } from '../../utils/formatContentData';

const BannerSlide = ({ movie, openTrailer }) => {
    const { displayTitle, backdropUrl } = formatContentData(movie);

    return (
        <>
            <div className="banner-img-container">
                <img src={backdropUrl} alt={displayTitle} />
            </div>
            <div className="overlay">
                <BannerInfo movie={movie} openTrailer={openTrailer} />
            </div>
        </>
    );
};
export default BannerSlide;
