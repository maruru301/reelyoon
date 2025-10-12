import './Main.css';

import { fetchPopularContents, fetchTopRatedContents, fetchTrendingContents } from '../../api/tmdb';

import ContentList from './ContentList';

const Main = () => {
    return (
        <main className="main">
            <ContentList
                title="Trending"
                contentsFetcher={fetchTrendingContents}
                showMediaType={true}
                showTimeWindow={true}
            />
            <ContentList title="Top Rated" contentsFetcher={fetchTopRatedContents} showMediaType={true} />
            <ContentList title="Popular" contentsFetcher={fetchPopularContents} showMediaType={true} />
        </main>
    );
};

export default Main;
