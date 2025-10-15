import { useEffect, useState } from 'react';

import HeaderBar from '../components/Header/HeaderBar/HeaderBar';
import { fetchSearchContents } from '../api/tmdb';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
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

    return (
        <>
            <HeaderBar />
            <div style={{ marginTop: '8rem' }}>
                <h2>검색 결과: {query}</h2>
                <ul>
                    {results.map((item) => (
                        <li key={item.id}>
                            {item.title || item.name} ({item.media_type})
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SearchResults;
