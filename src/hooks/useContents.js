import { useEffect, useState } from 'react';

const useContents = (title, contentsFetcher, initialMediaType = 'movie') => {
    const [contents, setContents] = useState([]);
    const [mediaType, setMediaType] = useState(initialMediaType); // 'movie' or 'tv'
    const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week'
    const [loading, setLoading] = useState(true);

    const SKELETON_COUNT = 6; // 로딩 상태에서 표시할 스켈레톤 카드 개수

    useEffect(() => {
        setMediaType(initialMediaType);
    }, [initialMediaType]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data =
                    title === 'Trending'
                        ? await contentsFetcher(mediaType, timeWindow)
                        : await contentsFetcher(mediaType);
                setContents(data.results);
            } catch (err) {
                console.error(`${title} 영화 데이터 불러오기 실패`, err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [mediaType, timeWindow, contentsFetcher, title]);

    return {
        data: { contents, SKELETON_COUNT },
        state: { loading, mediaType, timeWindow },
        actions: { setMediaType, setTimeWindow },
    };
};

export default useContents;
