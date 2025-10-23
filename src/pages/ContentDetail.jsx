import { useParams } from 'react-router-dom';

const ContentDetail = () => {
    const { type, id } = useParams();

    return <div>{(type, id)}</div>;
};

export default ContentDetail;
