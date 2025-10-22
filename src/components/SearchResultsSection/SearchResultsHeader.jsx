const SearchResultsHeader = ({
    filter,
    onFilterChange,
    totalMovieResults,
    totalTvResults,
    sortOption,
    onSortChange,
}) => {
    return (
        <div className="search-results-header">
            <div className="search-results-title-tabs">
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

            <select className="sort-select" value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
                <option value="latest">최신순</option>
                <option value="rating">평점순</option>
                <option value="popularity">인기순</option>
            </select>
        </div>
    );
};

export default SearchResultsHeader;
