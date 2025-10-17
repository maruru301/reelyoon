import { useEffect, useState } from 'react';

import PlayBtn from '../../assets/play-btn.svg';
import Star from '../../assets/star.svg';
import { fetchMovieImages } from '../../api/tmdb';

const BannerInfo = ({ movie, openTrailer }) => {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchLogoImage = async () => {
            try {
                const images = await fetchMovieImages(movie.id);

                console.log(`${movie.title} : ${images.logos.length}`);
                console.log(images.logos);

                setLogoUrl(images.logos[0].file_path);
            } catch (err) {
                console.error(`영화 로고 데이터 불러오기 실패`, err);
            }
        };

        fetchLogoImage();
    });

    console.log(logoUrl);

    return (
        <div className="banner-info">
            <img
                className="movie-logo"
                src={`https://image.tmdb.org/t/p/original${logoUrl}`}
                alt={`${movie.title} 로고`}
            />

            <h2>{movie.title}</h2>

            <div className="movie-stats">
                <div className="vote-average">
                    <img src={Star} alt="별 아이콘" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div>{movie.runtime}분</div>
                <div>{movie.release_date.slice(0, 4)}</div>
                <div>{movie.genres.map((g) => g.name).join(' · ')}</div>
            </div>

            <p>{movie.overview}</p>

            <button className="play-btn" onClick={() => openTrailer(movie.trailerKey)}>
                <img src={PlayBtn} alt="재생 버튼" />
                <span>Play</span>
            </button>
        </div>
    );
};
export default BannerInfo;
