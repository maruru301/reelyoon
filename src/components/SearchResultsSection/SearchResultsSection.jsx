import './SearchResultsSection.css';

import { useEffect, useState } from 'react';

import ContentCard from '../ContentSection/ContentCard';
import { fetchSearchContents } from '../../api/tmdb';
import { useSearchParams } from 'react-router-dom';

const SearchResultsSection = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!query) return;
        const fetchData = async () => {
            const data = await fetchSearchContents(query);
            setResults(data);
        };
        fetchData();
    }, [query]);

    const filteredResults = results.filter((r) => {
        if (filter === 'all') return true;
        return r.media_type === filter;
    });

    console.log(filteredResults);

    return (
        <div className="search-results-section">
            <div className="search-results-header">
                <h2 className="content-title gradient-text">검색 결과</h2>

                <div className="search-results-tabs">
                    <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                        전체 ({results.length})
                    </button>
                    <button className={filter === 'movie' ? 'active' : ''} onClick={() => setFilter('movie')}>
                        영화 ({results.filter((r) => r.media_type === 'movie').length})
                    </button>
                    <button className={filter === 'tv' ? 'active' : ''} onClick={() => setFilter('tv')}>
                        TV ({results.filter((r) => r.media_type === 'tv').length})
                    </button>
                </div>
            </div>

            <div className="search-results-grid">
                {filteredResults.map((result) => (
                    <ContentCard key={result.id} content={result} mediaType={result.media_type} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultsSection;
