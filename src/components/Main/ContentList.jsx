import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';

import Arrow from '../../assets/arrow.svg';
import ContentCard from './ContentCard';
import ContentCardSkeleton from './ContentCardSkeleton';
import ContentToggleButton from './ContentToggleButton';
import { Navigation } from 'swiper/modules';
import useContents from '../../hooks/useContents';

const ContentList = ({ title, contentsFetcher, showMediaType = false, showTimeWindow = false }) => {
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const {
        data: { contents, SKELETON_COUNT },
        state: { loading, mediaType, timeWindow },
        actions: { setMediaType, setTimeWindow },
    } = useContents(title, contentsFetcher);

    const skeletons = Array.from({ length: SKELETON_COUNT });

    // Swiper prev/next 버튼 제어
    useEffect(() => {
        if (!swiperRef.current) return;

        const swiper = swiperRef.current.swiper;

        // 초기 숨김
        prevRef.current.classList.toggle('hidden', swiper.isBeginning);

        // 슬라이드 변경 시 버튼 숨김/표시 제어
        swiper.on('slideChange', () => {
            prevRef.current.classList.toggle('hidden', swiper.isBeginning);
            nextRef.current.classList.toggle('hidden', swiper.isEnd);
        });
    }, []);

    return (
        <section className="content-list">
            <div className="content-list-header">
                <h2 className="gradient-text">{title}</h2>

                {showMediaType && (
                    <ContentToggleButton
                        options={[
                            { label: 'Movie', value: 'movie' },
                            { label: 'TV', value: 'tv' },
                        ]}
                        activeValue={mediaType}
                        onChange={setMediaType}
                    />
                )}

                {showTimeWindow && (
                    <ContentToggleButton
                        options={[
                            { label: 'Daily', value: 'day' },
                            { label: 'Weekly', value: 'week' },
                        ]}
                        activeValue={timeWindow}
                        onChange={setTimeWindow}
                    />
                )}
            </div>

            <Swiper
                className="content-swiper"
                ref={swiperRef}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={30}
                modules={[Navigation]}
                navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                }}
            >
                {loading
                    ? skeletons.map((_, idx) => (
                          <SwiperSlide key={idx}>
                              <ContentCardSkeleton />
                          </SwiperSlide>
                      ))
                    : contents.map((content) => (
                          <SwiperSlide key={content.id}>
                              <ContentCard content={content} mediaType={mediaType} />
                          </SwiperSlide>
                      ))}

                <button className="prev-btn" ref={prevRef}>
                    <img src={Arrow} alt="이전 버튼" />
                </button>
                <button className="next-btn" ref={nextRef}>
                    <img src={Arrow} alt="다음 버튼" />
                </button>
            </Swiper>
        </section>
    );
};

export default ContentList;
