import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeaderSlider.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchMovieDetails, fetchMovieVideos, fetchPopularContents } from '../../api/tmdb';
import { useEffect, useState } from 'react';

import BannerSlide from './BannerSlide';
import TrailerModal from './TrailerModal';

const HeaderSlider = () => {
    const [movies, setMovies] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false); // 트레일러 open 상태
    const [trailerUrl, setTrailerUrl] = useState(''); // 트레일러 URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const popularMovies = await fetchPopularContents();

                const moviesWithTrailer = []; // 트레일러가 있는 영화만 담을 배열

                for (const movie of popularMovies) {
                    const trailers = await fetchMovieVideos(movie.id);

                    console.log(trailers);
                    if (trailers.length > 0) {
                        // 트레일러가 있는 경우
                        const details = await fetchMovieDetails(movie.id);
                        moviesWithTrailer.push({ ...movie, ...details, trailerKey: trailers[0].key });
                    }
                    console.log(moviesWithTrailer);

                    if (moviesWithTrailer.length === 6) break;
                }

                setMovies(moviesWithTrailer);
            } catch (err) {
                console.error('Popular 영화 상세 데이터 불러오기 실패', err);
            }
        };
        fetchData();
    }, []);

    // 트레일러 open
    const openTrailer = async (movie) => {
        try {
            setTrailerUrl(`https://www.youtube.com/embed/${movie.trailerKey}`);
            setIsTrailerOpen(true);
        } catch (err) {
            console.error('트레일러 불러오기 실패', err);
        }
    };

    return (
        <div className="header-slider">
            {movies.length > 0 && (
                <Swiper
                    className="header-swiper"
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
                            <BannerSlide movie={movie} openTrailer={() => openTrailer(movie)} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <TrailerModal
                isTrailerOpen={isTrailerOpen}
                trailerUrl={trailerUrl}
                onClose={() => setIsTrailerOpen(false)}
            />
        </div>
    );
};

export default HeaderSlider;
