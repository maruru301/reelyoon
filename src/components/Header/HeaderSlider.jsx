import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeaderSlider.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchMovieDetails, fetchMovieVideos, fetchPopularContents } from '../../api/tmdb';
import { useEffect, useRef, useState } from 'react';

import BannerSkeleton from '../common/BannerSkeleton';
import BannerSlide from './BannerSlide';
import TrailerModal from './TrailerModal';
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
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // loading 상태
    const swiperRef = useRef(null);
    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer(swiperRef);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const popularMovies = await fetchPopularContents();

                const moviePromises = popularMovies.map(async (movie) => {
                    const trailers = await fetchMovieVideos(movie.id);

                    if (trailers.length > 0) {
                        // 트레일러가 있는 경우
                        const details = await fetchMovieDetails(movie.id);
                        return { ...movie, ...details, trailerKey: trailers[0].key };
                    }
                    return null; // 트레일러 없음
                });

                // 트레일러가 있는 영화만 담을 배열
                const moviesWithTrailer = (await Promise.all(moviePromises))
                    .filter(Boolean) // null 제거
                    .slice(0, 6);

                setMovies(moviesWithTrailer);
            } catch (err) {
                console.error('Popular 영화 상세 데이터 불러오기 실패', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
