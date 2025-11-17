import { fetchMovieDetails, fetchMovieVideos, fetchTvDetails, fetchTvVideos } from '../api/detailsApi';
import { useEffect, useState } from 'react';

import ContentDetailSkeleton from '../components/Skeleton/ContentDetailSkeleton';
import ContentInfoSection from '../components/sections/ContentInfoSection/ContentInfoSection';
import TabContent from '../components/Tab/TabContent';
import Tabs from '../components/Tab/Tabs';
import TrailerModal from '../components/Trailer/TrailerModal';
import { useParams } from 'react-router-dom';
import useTrailer from '../hooks/useTrailer';

const ContentDetail = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('credits');

    const { isTrailerOpen, trailerUrl, openTrailer, closeTrailer } = useTrailer();

    const tabs = [
        { key: 'credits', label: '출연 / 제작' },
        ...(type === 'movie' ? [{ key: 'collection', label: '컬렉션' }] : []), // movie일 때만 나타나도록
        { key: 'recommended', label: '추천 콘텐츠' },
    ];

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

    if (loading) return <ContentDetailSkeleton />;
    if (!details) return <p>데이터를 불러올 수 없습니다.</p>;

    return (
        <>
            <ContentInfoSection
                details={details}
                openTrailer={trailerKey ? () => openTrailer(trailerKey) : null}
                type={type}
            />

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            <TabContent activeTab={activeTab} details={details} id={id} type={type} />

            {isTrailerOpen && (
                <TrailerModal isTrailerOpen={isTrailerOpen} trailerUrl={trailerUrl} onClose={closeTrailer} />
            )}
        </>
    );
};

export default ContentDetail;
