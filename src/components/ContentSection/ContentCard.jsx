import Star from '../../assets/star.svg';

const ContentCard = ({ content, mediaType }) => {
    const posterUrl = `https://image.tmdb.org/t/p/original${content.poster_path}`;

    const contentTitle =
        mediaType === 'movie'
            ? `${content.title} (${content.release_date?.slice(0, 4)})`
            : `${content.name} (${content.first_air_date?.slice(0, 4)})`;

    return (
        <div className="content-card">
            <img src={posterUrl} alt={mediaType === 'movie' ? `${content.title}` : `${content.name}`} />

            <h3 className="fade-up">{contentTitle}</h3>

            <div className="vote-average fade-up">
                <img src={Star} alt="별 아이콘" />
                <span>{content.vote_average.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default ContentCard;
