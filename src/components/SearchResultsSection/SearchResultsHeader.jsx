const SearchResultsHeader = ({ filter, onFilterChange, totalMovieResults, totalTvResults }) => {
    return (
        <div className="search-results-header">
            <h2 className="content-title gradient-text">검색 결과</h2>
            <div className="search-results-tabs">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>
                    전체 ({totalMovieResults + totalTvResults})
                </button>
                <button className={filter === 'movie' ? 'active' : ''} onClick={() => onFilterChange('movie')}>
                    영화 ({totalMovieResults})
                </button>
                <button className={filter === 'tv' ? 'active' : ''} onClick={() => onFilterChange('tv')}>
                    TV ({totalTvResults})
                </button>
            </div>
        </div>
    );
};

export default SearchResultsHeader;
