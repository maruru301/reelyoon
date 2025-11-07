import { useEffect, useMemo, useState } from 'react';

import ContentResultsSection from '../components/common/ContentResultsSection';
import useSearchResults from '../hooks/useSearchResults';
import useSearchState from '../hooks/useSearchState';

const SearchResults = () => {
    const { query, filter, currentPage, updateFilter, updatePage } = useSearchState();
    const [sortOption, setSortOption] = useState('release_date.desc'); // 정렬 상태

    const { results, totalMovieResults, totalTvResults, totalPages } = useSearchResults(query, filter, currentPage);

    // 정렬된 결과 (최신순 / 평점순)
    const sortedResults = useMemo(() => {
        if (!results) return [];

        const sorted = [...results];
        if (sortOption === 'release_date.desc') {
            // 인기순
            sorted.sort(
                (a, b) =>
                    new Date(b.release_date || b.first_air_date || 0) -
                    new Date(a.release_date || a.first_air_date || 0)
            );
        } else if (sortOption === 'release_date.asc') {
            // 최신순
            sorted.sort(
                (a, b) =>
                    new Date(a.release_date || a.first_air_date || 0) -
                    new Date(b.release_date || b.first_air_date || 0)
            );
        } else if (sortOption === 'vote_average.desc') {
            // 평점순
            sorted.sort((a, b) => b.vote_average - a.vote_average);
        } else if (sortOption === 'popularity.desc') {
            // 인기순
            sorted.sort((a, b) => b.popularity - a.popularity);
        }

        return sorted;
    }, [results, sortOption]);

    // 정렬 변경 시 1페이지로 이동
    const onSortChange = (newSort) => {
        setSortOption(newSort);
        if (currentPage !== 1) updatePage(1);
    };

    // query 또는 filter가 변경되면 정렬 옵션 초기화
    useEffect(() => {
        setSortOption('release_date.desc');
    }, [query, filter]);

    // 페이지 또는 검색어 변경 시 스크롤 위로
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, query]);

    return (
        <ContentResultsSection
            title={`"${query}" 검색 결과`}
            totalResults={totalMovieResults + totalTvResults}
            tabs={[
                { label: `전체 (${totalMovieResults + totalTvResults})`, value: 'all' },
                { label: `영화 (${totalMovieResults})`, value: 'movie' },
                { label: `TV (${totalTvResults})`, value: 'tv' },
            ]}
            activeTab={filter}
            onTabChange={updateFilter}
            sortOption={sortOption}
            onSortChange={onSortChange}
            contents={sortedResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={updatePage}
        />
    );
};

export default SearchResults;
