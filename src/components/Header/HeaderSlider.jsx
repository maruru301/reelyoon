import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeaderSlider.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchMovieDetails, fetchPopularMovies } from '../../api/tmdb';
import { useEffect, useState } from 'react';

import BannerSlide from './BannerSlide';

const HeaderSlider = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const popularMovies = await fetchPopularMovies(1);
                const slicedPopularMovies = popularMovies.slice(3, 9);

                const movieDetails = await Promise.all(
                    slicedPopularMovies.map(async (movie) => {
                        const details = await fetchMovieDetails(movie.id);
                        return { ...movie, ...details };
                    })
                );

                setMovies(movieDetails);
            } catch (err) {
                console.error('Popular 영화 상세 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="header-slider">
            {movies.length > 0 && (
                <Swiper
                    className="header-swiper"
                    key={movies.length}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    centeredSlides={true}
                    allowTouchMove={false}
                    observer={true}
                    observeParents={true}
                >
                    {movies.map((movie) => (
                        <SwiperSlide className="header-swiper-slide" key={movie.id}>
                            <BannerSlide movie={movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default HeaderSlider;
