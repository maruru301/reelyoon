import './BannerSection.css';

import BannerSkeleton from '../Skeleton/BannerSkeleton';
import BannerSwiper from './BannerSwiper';
import TrailerModal from './TrailerModal';
import useHeaderMovies from '../../hooks/useHeaderMovies';
import { useRef } from 'react';
import useTrailer from '../../hooks/useTrailer';

const BannerSection = () => {
    const swiperRef = useRef(null);
    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer(swiperRef);
    const { movies, loading } = useHeaderMovies();

    return (
        <section className="banner-section">
            {loading ? (
                <BannerSkeleton />
            ) : (
                <BannerSwiper movies={movies} openTrailer={openTrailer} swiperRef={swiperRef} />
            )}

            <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
        </section>
    );
};

export default BannerSection;
