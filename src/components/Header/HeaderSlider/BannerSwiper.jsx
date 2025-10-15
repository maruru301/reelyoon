import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import BannerSlide from './BannerSlide';

const BannerSwiper = ({ movies, openTrailer, swiperRef }) => {
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

export default BannerSwiper;
