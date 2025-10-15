import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeaderSlider.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import BannerSkeleton from '../common/BannerSkeleton';
import BannerSlide from './BannerSlide';
import TrailerModal from './TrailerModal';
import useHeaderMovies from '../../hooks/useHeaderMovies';
import { useRef } from 'react';
import useTrailer from '../../hooks/useTrailer';

const HeaderSwiper = ({ movies, openTrailer, swiperRef }) => {
    return (
        <Swiper
            className="header-swiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스를 ref에 저장
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            centeredSlides={false}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            allowTouchMove={false}
        >
            {movies.map((movie) => (
                <SwiperSlide className="header-swiper-slide" key={movie.id}>
                    <BannerSlide movie={movie} openTrailer={openTrailer} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const HeaderSlider = () => {
    const swiperRef = useRef(null);
    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer(swiperRef);
    const { movies, loading } = useHeaderMovies();

    return (
        <div className="header-slider">
            {loading ? (
                <BannerSkeleton />
            ) : (
                <HeaderSwiper movies={movies} openTrailer={openTrailer} swiperRef={swiperRef} />
            )}

            <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
        </div>
    );
};

export default HeaderSlider;
