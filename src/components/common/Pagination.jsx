import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, blockSize = 5 }) => {
    if (!totalPages || totalPages <= 1) return null; // 페이지가 1개 이하면 표시하지 않음

    // 현재 블록 계산
    const currentBlock = Math.floor((currentPage - 1) / blockSize);
    // 블록 시작 페이지 계산
    const startPage = currentBlock * blockSize + 1;
    // 블록 끝 페이지 계산
    const endPage = Math.min(startPage + blockSize - 1, totalPages); // 단, totalPages를 넘지 않도록

    const hasPrevBlock = startPage > 1;
    const hasNextBlock = endPage < totalPages;

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {/* 이전 버튼 - 이동 가능한 경우에만 표시 */}
            {hasPrevBlock && (
                <button className="pagination-prev" onClick={() => onPageChange(startPage - 1)}>
                    이전
                </button>
            )}

            {/* 페이지 번호 */}
            {pages.map((page) => {
                return (
                    <button
                        key={page}
                        className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}

            {/* 다음 버튼 - 이동 가능한 경우에만 표시 */}
            {hasNextBlock && (
                <button className="pagination-next" onClick={() => onPageChange(endPage + 1)}>
                    다음
                </button>
            )}
        </div>
    );
};

export default Pagination;
