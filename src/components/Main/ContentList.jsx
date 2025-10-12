import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

import Arrow from '../../assets/arrow.svg';
import ContentCard from './ContentCard';
import ContentToggleGroup from './ContentToggleGroup';
import { Navigation } from 'swiper/modules';

const ContentList = ({ title, contentsFetcher, showMediaType = false, showTimeWindow = false }) => {
    const [contents, setContents] = useState([]);
    const [mediaType, setMediaType] = useState('movie'); // 'movie' or 'tv'
    const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week'

    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // 데이터 fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (title === 'Trending') {
                    data = await contentsFetcher(mediaType, timeWindow);
                } else {
                    data = await contentsFetcher(mediaType);
                }
                setContents(data);
            } catch (err) {
                console.error(`${title} 영화 데이터 불러오기 실패`, err);
            }
        };
        fetchData();
    }, [mediaType, timeWindow, contentsFetcher]);

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
                    <ContentToggleGroup
                        options={[
                            { label: 'Movie', value: 'movie' },
                            { label: 'TV', value: 'tv' },
                        ]}
                        activeValue={mediaType}
                        onChange={setMediaType}
                    />
                )}

                {showTimeWindow && (
                    <ContentToggleGroup
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
                {contents?.map((content) => (
                    <SwiperSlide className="content-swiper-slide" key={content.id}>
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
