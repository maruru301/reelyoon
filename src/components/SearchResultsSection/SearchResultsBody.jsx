import ContentCard from '../common/ContentCard';
import Pagination from '../Pagination/Pagination';

const SearchResultsBody = ({ results, currentPage, totalPages, blockSize, onPageChange }) => {
    return (
        <div className="search-results-body">
            <div className="pagination-info">{`${currentPage}/${totalPages} 페이지`}</div>

            <div className="search-results-grid">
                {results.map((result) => (
                    <ContentCard key={result.id} content={result} mediaType={result.media_type} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                blockSize={blockSize}
            />
        </div>
    );
};

export default SearchResultsBody;
