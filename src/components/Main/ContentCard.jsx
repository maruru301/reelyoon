const ContentCard = ({ content }) => {
    const posterUrl = `https://image.tmdb.org/t/p/w200${content.backdrop_path}`;

    return (
        <li>
            <h3>{content.title}</h3>
            <div>
                <img src={posterUrl} alt="" style={{ width: '500px', height: '300px' }} />
            </div>
        </li>
    );
};

export default ContentCard;
