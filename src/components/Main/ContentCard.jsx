import Star from '../../assets/star.svg';

const ContentCard = ({ content }) => {
    const posterUrl = `https://image.tmdb.org/t/p/original${content.poster_path}`;

    return (
        <div className="content-card">
            <img src={posterUrl} alt={content.title} />

            <h3 className="fade-up">{`${content.title} (${content.release_date.slice(0, 4)})`}</h3>

            <div className="vote-average fade-up">
                <img src={Star} alt="별 아이콘" />
                <span>{content.vote_average.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default ContentCard;
