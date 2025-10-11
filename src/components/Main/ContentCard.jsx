const ContentCard = ({ content }) => {
    const posterUrl = `https://image.tmdb.org/t/p/original${content.poster_path}`;

    return (
        <div className="content-card">
            <h3>{content.title}</h3>
            <img src={posterUrl} alt={content.title} />
        </div>
    );
};

export default ContentCard;
