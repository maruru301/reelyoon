import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // pathname이 바뀔 때마다 맨 위로 이동

    return null;
};

export default ScrollToTop;
