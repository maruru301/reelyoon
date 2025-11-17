import { useEffect, useRef } from 'react';

const useSwiperNavigation = () => {
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Swiper prev/next 버튼 제어
    useEffect(() => {
        if (!swiperRef.current) return;

        const swiper = swiperRef.current.swiper;

        // 슬라이드 변경 시 버튼 숨김/표시 제어
        swiper.on('slideChange', () => {
            prevRef.current.classList.toggle('hidden', swiper.isBeginning);
            nextRef.current.classList.toggle('hidden', swiper.isEnd);
        });
    }, []);

    return { swiperRef, prevRef, nextRef };
};

export default useSwiperNavigation;
