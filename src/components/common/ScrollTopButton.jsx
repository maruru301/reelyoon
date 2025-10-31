import './ScrollTopButton.css';

import { useEffect, useState } from 'react';

import ScrollToTop from '../../assets/scroll-to-top.svg';

const ScrollTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setVisible(true); // 300px 이상 내려가면 버튼 표시
            else setVisible(false);
        };

        // 스크롤 이벤트 등록
        window.addEventListener('scroll', handleScroll);

        // cleanup 함수 - 컴포넌트가 사라질 때 스크롤 이벤트 제거
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`scroll-top-button ${visible ? 'show' : ''}`}
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
        >
            <img src={ScrollToTop} alt="위로가기" />
        </button>
    );
};

export default ScrollTopButton;
