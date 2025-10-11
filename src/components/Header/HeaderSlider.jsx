import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchMovieDetails, fetchPopularMovies } from '../../api/tmdb';
import { useEffect, useState } from 'react';

import PlayBtn from '../../assets/play-btn.svg';
import Star from '../../assets/star.svg';

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
                console.log(movieDetails);

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
                            <div className="overlay">
                                <div className="movie-info">
                                    <h2 className="gradient-text">{movie.title}</h2>
                                    <div className="movie-stats">
                                        <div className="vote-average">
                                            <img src={Star} alt="별 아이콘" />
                                            <span>{movie.vote_average.toFixed(1)}</span>
                                        </div>
                                        <div>{movie.runtime}분</div>
                                        <div>{movie.release_date.slice(0, 4)}</div>
                                        <div>{movie.genres.map((g) => `${g.name} `)}</div>
                                    </div>
                                    <p>{movie.overview}</p>

                                    <button className="play-btn">
                                        <img src={PlayBtn} alt="재생 버튼" />
                                        <span>Play</span>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default HeaderSlider;
