import { useState } from 'react';

const useTrailer = (swiperRef) => {
    const [isTrailerOpen, setIsTrailerOpen] = useState(false); // 트레일러 open 상태
    const [trailerUrl, setTrailerUrl] = useState(''); // 트레일러 URL

    // 트레일러 open
    const openTrailer = (trailerKey) => {
        setTrailerUrl(`https://www.youtube.com/embed/${trailerKey}`);
        setIsTrailerOpen(true);

        swiperRef.current?.autoplay.stop(); // 모달 열면 슬라이드 stop
    };

    // 트레일러 close
    const closeTrailer = () => {
        setIsTrailerOpen(false);

        swiperRef.current?.autoplay.start(); // 모달 닫으면 슬라이드 start
    };

    return { isTrailerOpen, trailerUrl, openTrailer, closeTrailer };
};

export default useTrailer;
