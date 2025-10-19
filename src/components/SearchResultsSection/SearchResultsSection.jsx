import './SearchResultsSection.css';

import { useEffect, useState } from 'react';

import ContentCard from '../ContentSection/ContentCard';
import { fetchSearchContents } from '../../api/tmdb';
import { useSearchParams } from 'react-router-dom';

const SearchResultsSection = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) return;
        const fetchData = async () => {
            const data = await fetchSearchContents(query);
            setResults(data);
        };
        fetchData();
    }, [query]);

    console.log(results);

    return (
        <div className="search-results-section">
            <h2>검색 결과: {query}</h2>

            <div className="search-results-grid">
                {results.map((result) => (
                    <ContentCard key={result.id} content={result} mediaType={result.media_type} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultsSection;
