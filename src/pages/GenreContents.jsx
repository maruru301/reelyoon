import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { fetchContentsByGenre } from '../api/listApi';

const GenreContents = () => {
    const { genreId } = useParams();
    const { state } = useLocation();

    const genreName = state?.genreName;

    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContents = async () => {
            try {
                setLoading(true);

                const data = await fetchContentsByGenre('movie', genreId);
                setContents(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (genreId) loadContents();
    }, [genreId]);

    if (loading) return <div style={{ padding: '10rem' }}>로딩 중...</div>;

    return (
        <div style={{ padding: '10rem' }}>
            <h1>{genreName}</h1>

            {contents.length === 0 ? (
                <p>표시할 콘텐츠가 없습니다.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {contents.map((content) => (
                        <div key={content.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w300${content.poster_path}`}
                                alt={content.title || content.name}
                                style={{ width: '100%' }}
                            />
                            <p>{content.title || content.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenreContents;
