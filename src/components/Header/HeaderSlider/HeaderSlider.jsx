import './HeaderSlider.css';

import BannerSkeleton from './BannerSkeleton';
import BannerSwiper from './BannerSwiper';
import TrailerModal from './TrailerModal';
import useHeaderMovies from '../../../hooks/useHeaderMovies';
import { useRef } from 'react';
import useTrailer from '../../../hooks/useTrailer';

const HeaderSlider = () => {
    const swiperRef = useRef(null);
    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer(swiperRef);
    const { movies, loading } = useHeaderMovies();

    return (
        <div className="header-slider">
            {loading ? (
                <BannerSkeleton />
            ) : (
                <BannerSwiper movies={movies} openTrailer={openTrailer} swiperRef={swiperRef} />
            )}

            <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
        </div>
    );
};

export default HeaderSlider;
