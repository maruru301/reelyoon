import './ContentResultsSection.css';

import { useEffect, useState } from 'react';

import ContentCard from './ContentCard';
import ContentResultsSkeleton from '../Skeleton/ContentResultsSkeleton';
import Pagination from '../Pagination/Pagination';

const ContentResultsSection = ({
    title,
    totalResults,
    tabs = [],
    activeTab,
    onTabChange,
    sortOption,
    onSortChange,
    contents = [],
    currentPage,
    totalPages,
    onPageChange,
    loading = false,
}) => {
    const [blockSize, setBlockSize] = useState(5);

    // 반응형 blockSize
    useEffect(() => {
        const updateBlockSize = () => setBlockSize(window.innerWidth >= 1024 ? 10 : 5);
        updateBlockSize();
        window.addEventListener('resize', updateBlockSize);
        return () => window.removeEventListener('resize', updateBlockSize);
    }, []);

    if (loading) return <ContentResultsSkeleton />;

    return (
        <div className="content-results-section">
            {/* header */}
            <div className="content-results-header">
                <div className="content-results-title-tabs">
                    <h1 className="content-title gradient-text">{title}</h1>

                    {totalResults && (
                        <div>
                            총 {totalResults[activeTab] ?? totalResults.all}개의{' '}
                            {activeTab === 'movie' ? '영화' : activeTab === 'tv' ? 'TV' : ''} 결과
                        </div>
                    )}

                    {tabs?.length > 0 && (
                        <div className="content-results-tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={tab.value === activeTab ? 'active' : ''}
                                    onClick={() => onTabChange(tab.value)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {onSortChange && (
                    <select
                        className="content-sort-select"
                        value={sortOption}
                        onChange={(e) => onSortChange?.(e.target.value)}
                    >
                        <option value="popularity.desc">인기순</option>
                        <option value="release_date.desc">최신순</option>
                        <option value="release_date.asc">오래된순</option>
                        <option value="vote_average.desc">평점순</option>
                    </select>
                )}
            </div>

            {/* body */}
            <div className="content-results-body">
                {contents.length === 0 ? (
                    <p className="empty-message">{'표시할 콘텐츠가 없습니다.'}</p>
                ) : (
                    <>
                        <div className="content-pagination-info">{`${currentPage}/${totalPages} 페이지`}</div>

                        <div className="content-results-grid">
                            {contents.map((content) => (
                                <div key={content.id}>
                                    <ContentCard content={content} mediaType={content.media_type || activeTab} />
                                </div>
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            blockSize={blockSize}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentResultsSection;
