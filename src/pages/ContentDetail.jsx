import { fetchMovieDetails, fetchTvDetails } from '../api/detailsApi';
import { useEffect, useState } from 'react';

import ContentInfoSection from '../components/ContentInfoSection/ContentInfoSection';
import CreditsSection from '../components/CreditsSection/CreditsSection';
import { useParams } from 'react-router-dom';

const ContentDetail = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);

            try {
                const data = type === 'movie' ? await fetchMovieDetails(id) : await fetchTvDetails(id);
                setDetails(data);
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
            <ContentInfoSection details={details} />
            <CreditsSection directors={details.directors} cast={details.cast} />
        </>
    );
};

export default ContentDetail;
