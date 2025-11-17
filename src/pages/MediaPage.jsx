import { fetchPopularContents, fetchTopRatedContents, fetchTrendingContents } from '../api/listApi';

import ContentList from '../components/sections/ContentSection/ContentList';
import { useParams } from 'react-router-dom';

const MediaPage = () => {
    const { mediaType } = useParams();

    return (
        <div>
            <ContentList
                title="Trending"
                contentsFetcher={fetchTrendingContents}
                showTimeWindow={true}
                category="trending"
                initialMediaType={mediaType}
            />
            <ContentList
                title="Top Rated"
                contentsFetcher={fetchTopRatedContents}
                category="top-rated"
                initialMediaType={mediaType}
            />
            <ContentList
                title="Popular"
                contentsFetcher={fetchPopularContents}
                category="popular"
                initialMediaType={mediaType}
            />
        </div>
    );
};

export default MediaPage;
