import { useParams } from 'react-router-dom';

const GenreContents = () => {
    const { genreId } = useParams();

    return <div style={{ padding: '10rem' }}>genreId: {genreId}</div>;
};

export default GenreContents;
