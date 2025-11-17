import './ContentSection.css';

import { fetchPopularContents, fetchTopRatedContents, fetchTrendingContents } from '../../../api/listApi';

import ContentList from './ContentList';

const ContentSection = () => {
    return (
        <section className="content-section">
            <ContentList
                title="Trending"
                contentsFetcher={fetchTrendingContents}
                showMediaType={true}
                showTimeWindow={true}
                category="trending"
            />
            <ContentList
                title="Top Rated"
                contentsFetcher={fetchTopRatedContents}
                showMediaType={true}
                category="top-rated"
            />
            <ContentList
                title="Popular"
                contentsFetcher={fetchPopularContents}
                showMediaType={true}
                category="popular"
            />
        </section>
    );
};

export default ContentSection;
