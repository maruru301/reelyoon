import Search from '../../assets/search.svg';
import { useState } from 'react';

const SearchBox = () => {
    const [inputOpen, setInputOpen] = useState(false);

    return (
        <div className="search-box">
            <form className="search-form" action="#" autoComplete="off">
                <input
                    className={`search-input ${inputOpen ? 'open' : ''}`}
                    type="text"
                    name="query"
                    placeholder="검색"
                />
                <button className="search-btn" type="button" onClick={() => setInputOpen((prev) => !prev)}>
                    <img src={Search} alt="검색 버튼" />
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
