import './ContentSection.css';

import { fetchPopularContents, fetchTopRatedContents, fetchTrendingContents } from '../../api/tmdb';

import ContentList from './ContentList';

const ContentSection = () => {
    return (
        <section className="content-section">
            <ContentList
                title="Trending"
                contentsFetcher={fetchTrendingContents}
                showMediaType={true}
                showTimeWindow={true}
            />
            <ContentList title="Top Rated" contentsFetcher={fetchTopRatedContents} showMediaType={true} />
            <ContentList title="Popular" contentsFetcher={fetchPopularContents} showMediaType={true} />
        </section>
    );
};

export default ContentSection;
