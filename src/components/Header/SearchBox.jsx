import { useRef, useState } from 'react';

import Search from '../../assets/search.svg';
import { fetchSearchContents } from '../../api/tmdb';

const SearchBox = () => {
    const [inputOpen, setInputOpen] = useState(false);
    const [query, setQuery] = useState('');

    const inputRef = useRef(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        const results = await fetchSearchContents(query);
        console.log('검색 결과:', results);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="search-box">
            <div className="search-form">
                <input
                    className={`search-input ${inputOpen ? 'open' : ''}`}
                    ref={inputRef}
                    type="text"
                    name="query"
                    placeholder="검색"
                    autoComplete="off"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown} // Enter 감지
                />
                <button
                    className="search-btn"
                    type="button"
                    onClick={() => {
                        if (inputOpen && query.trim()) {
                            handleSearch(); // input이 열려 있고 텍스트가 있으면 검색
                        }
                        setInputOpen((prev) => {
                            if (!prev && inputRef.current) inputRef.current.focus(); // 포커스
                            return !prev;
                        });
                    }}
                >
                    <img src={Search} alt="검색 버튼" />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
