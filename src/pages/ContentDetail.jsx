import { fetchMovieDetails, fetchMovieVideos, fetchTvDetails, fetchTvVideos } from '../api/detailsApi';
import { useEffect, useState } from 'react';

import ContentInfoSection from '../components/ContentInfoSection/ContentInfoSection';
import TabContent from '../components/common/TabContent';
import Tabs from '../components/common/Tabs';
import TrailerModal from '../components/Trailer/TrailerModal';
import { useParams } from 'react-router-dom';
import useTrailer from '../hooks/useTrailer';

const TABS = [
    { key: 'credits', label: '출연 / 제작' },
    { key: 'recommended', label: '추천 콘텐츠' },
];

const ContentDetail = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('credits');

    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer();

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);

            try {
                // 상세 + 트레일러
                const [detailsData, videosData] = await Promise.all([
                    type === 'movie' ? fetchMovieDetails(id) : fetchTvDetails(id),
                    type === 'movie' ? fetchMovieVideos(id) : fetchTvVideos(id),
                ]);

                setDetails(detailsData);

                if (videosData.length) setTrailerKey(videosData[0].key);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (id && type) getDetails();
    }, [id, type]);

    if (loading) return <p>로딩 중...</p>;
    if (!details) return <p>데이터를 불러올 수 없습니다.</p>;

    return (
        <>
            <ContentInfoSection details={details} openTrailer={trailerKey ? () => openTrailer(trailerKey) : null} />

            <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

            <TabContent activeTab={activeTab} details={details} id={id} type={type} />

            {isTrailerOpen && (
                <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
            )}
        </>
    );
};

export default ContentDetail;
