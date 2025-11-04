export const formatContentData = (contentData) => {
    const { title, name, release_date, first_air_date, runtime, episode_run_time, backdrop_path, poster_path } =
        contentData;

    const displayTitle = title || name;

    const rawDate = release_date || first_air_date;
    const displayDate = rawDate
        ? new Date(rawDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    const displayRuntime = runtime || (episode_run_time?.[0] ?? null);

    const backdropUrl = backdrop_path
        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
        : `https://placehold.co/200x300/777/777`;

    const posterUrl = poster_path
        ? `https://image.tmdb.org/t/p/original${poster_path}`
        : 'https://placehold.co/200x300?text=No+Image';

    return {
        displayTitle,
        rawDate,
        displayDate,
        displayRuntime,
        backdropUrl,
        posterUrl,
    };
};
