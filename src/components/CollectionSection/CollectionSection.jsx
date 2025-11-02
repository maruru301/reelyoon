import './CollectionSection.css';

import { useEffect, useState } from 'react';

import ContentCard from '../common/ContentCard';
import ContentCardSkeleton from '../Skeleton/ContentCardSkeleton';
import { fetchMovieCollection } from '../../api/detailsApi';

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
        <div className="recommended-section">
            <h2 className="content-title gradient-text">{collection?.name || '컬렉션'}</h2>

            {loading ? (
                <div className="recommended-grid">
                    {[...Array(8)].map((_, i) => (
                        <ContentCardSkeleton key={i} />
                    ))}
                </div>
            ) : !collection ? (
                <p className="empty-message">컬렉션 정보가 없습니다.</p>
            ) : (
                <div className="recommended-grid">
                    {collection.parts.map((item) => (
                        <ContentCard key={item.id} content={item} mediaType="movie" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionSection;
