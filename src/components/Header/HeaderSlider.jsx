import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';

import { fetchPopularMovies } from '../../api/tmdb';

const HeaderSlider = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await fetchPopularMovies(1);
                setMovies(movies.slice(1, 7));
            } catch (err) {
                console.error('Popular 영화 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="header-slider">
            {movies.length > 0 && (
                <Swiper
                    className="swiper"
                    key={movies.length}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination]}
                    centeredSlides={true}
                    allowTouchMove={false}
                >
                    {movies.map((movie) => (
                        <SwiperSlide className="swiper-slide" key={movie.id}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default HeaderSlider;
