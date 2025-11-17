import { useEffect, useState } from 'react';

import ContentGridSection from '../../common/ContentGridSection';
import { fetchMovieCollection } from '../../../api/detailsApi';

const CollectionSection = ({ id }) => {
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCollection = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieCollection(id);
                setCollection(data);
            } catch (err) {
                console.error('Collection 데이터 가져오기 실패');
            } finally {
                setLoading(false);
            }
        };

        if (id) getCollection();
    }, [id]);

    return (
        <ContentGridSection
            title={collection?.name || '컬렉션'}
            loading={loading}
            contents={collection?.parts || []}
            mediaType={'movie'}
        />
    );
};

export default CollectionSection;
