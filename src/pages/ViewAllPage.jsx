import { useParams } from 'react-router-dom';

const ViewAllPage = () => {
    const { mediaType, category } = useParams();

    return (
        <div>
            {mediaType}, {category}
        </div>
    );
};

export default ViewAllPage;
