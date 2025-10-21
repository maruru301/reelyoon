import { useRef, useState } from 'react';

import Search from '../../../assets/search.svg';
import { fetchSearchAll } from '../../../api/tmdb';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [inputOpen, setInputOpen] = useState(false);
    const [query, setQuery] = useState('');

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        try {
            const { results } = await fetchSearchAll(trimmedQuery);

            if (results.length) {
                navigate(`/search?query=${encodeURIComponent(query)}`);
            } else {
                alert('검색 결과가 존재하지 않습니다.');

                // 검색창 닫히지 않게 유지 + 다시 포커스
                setInputOpen(true);
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        } catch (err) {
            console.error('검색 중 오류 발생:', err);
        }
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
