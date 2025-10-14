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

const HeaderSlider = () => {
    const [movies, setMovies] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false); // 트레일러 open 상태
    const [trailerUrl, setTrailerUrl] = useState(''); // 트레일러 URL
    const [loading, setLoading] = useState(true); // loading 상태

    const swiperRef = useRef(null);

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

    // 트레일러 open
    const openTrailer = (movie) => {
        setTrailerUrl(`https://www.youtube.com/embed/${movie.trailerKey}`);
        setIsTrailerOpen(true);

        swiperRef.current?.autoplay.stop(); // 모달 열면 슬라이드 stop
    };

    // 트레일러 close
    const closeTrailer = () => {
        setIsTrailerOpen(false);

        swiperRef.current?.autoplay.start(); // 모달 닫으면 슬라이드 start
    };

    return (
        <div className="header-slider">
            {loading ? (
                <BannerSkeleton />
            ) : (
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
            )}

            <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
        </div>
    );
};

export default HeaderSlider;
