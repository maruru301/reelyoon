import ContentCardSkeleton from '../Skeleton/ContentCardSkeleton';
import Star from '../../assets/star.svg';
import { useState } from 'react';

const ContentCard = ({ content, mediaType }) => {
    const [imgLoaded, setImgLoaded] = useState(!content.poster_path);

    const posterUrl = content.poster_path
        ? `https://image.tmdb.org/t/p/original${content.poster_path}`
        : 'https://placehold.co/200x300?text=No+Image';

    const title = mediaType === 'movie' ? content.title : content.name;
    const year = mediaType === 'movie' ? content.release_date?.slice(0, 4) : content.first_air_date?.slice(0, 4);
    const contentTitle = year ? `${title} (${year})` : title;

    return (
        <div className="content-card">
            {!imgLoaded && <ContentCardSkeleton />}

            <img
                src={posterUrl}
                alt={title}
                onLoad={() => setImgLoaded(true)}
                className={`card-image ${imgLoaded ? 'loaded' : ''}`}
            />

            {imgLoaded && (
                <>
                    <h3 className="fade-up">{contentTitle}</h3>

                    <div className="vote-average fade-up">
                        <img src={Star} alt="별 아이콘" />
                        <span>{content.vote_average.toFixed(1)}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default ContentCard;
