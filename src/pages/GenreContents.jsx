import { useLocation, useParams } from 'react-router-dom';

const GenreContents = () => {
    const { genreId } = useParams();
    const { state } = useLocation();

    const genreName = state?.genreName;

    return (
        <div style={{ padding: '10rem' }}>
            genreId: {genreId}, {genreName}
        </div>
    );
};

export default GenreContents;
