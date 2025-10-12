import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';

import Arrow from '../../assets/arrow.svg';
import ContentCard from './ContentCard';
import { Navigation } from 'swiper/modules';

const ContentList = ({ title, contents, showTimeWindow = false, timeWindow, setTimeWindow }) => {
    const swiperRef = useRef(null);

    // Swiper prev/next 버튼 제어
    useEffect(() => {
        if (!swiperRef.current) return;

        const swiper = swiperRef.current.swiper;
        const prev = document.querySelector('.prev-btn');
        const next = document.querySelector('.next-btn');

        // 초기 숨김
        prev.classList.toggle('hidden', swiper.isBeginning);

        // 슬라이드 변경 시 버튼 숨김/표시 제어
        swiper.on('slideChange', () => {
            prev.classList.toggle('hidden', swiper.isBeginning);
            next.classList.toggle('hidden', swiper.isEnd);
        });
    }, []);

    return (
        <section className="content-list">
            <div className="content-list-header">
                <h2 className="gradient-text">{title}</h2>

                {showTimeWindow && (
                    <div className="time-window-btn">
                        <button className={timeWindow === 'day' ? 'active' : ''} onClick={() => setTimeWindow('day')}>
                            Daily
                        </button>
                        <button className={timeWindow === 'week' ? 'active' : ''} onClick={() => setTimeWindow('week')}>
                            Weekly
                        </button>
                    </div>
                )}
            </div>

            <Swiper
                className="content-swiper"
                ref={swiperRef}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={30}
                modules={[Navigation]}
                navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
            >
                {contents.map((content) => (
                    <SwiperSlide className="content-swiper-slide" key={content.id}>
                        <ContentCard content={content} />
                    </SwiperSlide>
                ))}

                <button className="prev-btn">
                    <img src={Arrow} alt="이전 버튼" />
                </button>
                <button className="next-btn">
                    <img src={Arrow} alt="다음 버튼" />
                </button>
            </Swiper>
        </section>
    );
};

export default ContentList;
