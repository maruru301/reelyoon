import './ContentCard.css';

import ContentCardSkeleton from '../Skeleton/ContentCardSkeleton';
import MetaItem from './MetaItem';
import Star from '../../assets/star.svg';
import { getDDay } from '../../utils/getDDay';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ContentCard = ({ content, mediaType }) => {
    const [imgLoaded, setImgLoaded] = useState(!content.poster_path);

    const navigate = useNavigate();
    const type = mediaType || content.media_type;

    const posterUrl = content.poster_path
        ? `https://image.tmdb.org/t/p/original${content.poster_path}`
        : 'https://placehold.co/200x300?text=No+Image';

    const title = mediaType === 'movie' ? content.title : content.name;
    const year = mediaType === 'movie' ? content.release_date?.slice(0, 4) : content.first_air_date?.slice(0, 4);
    const contentTitle = year ? `${title} (${year})` : title;

    const releaseDateStr = mediaType === 'movie' ? content.release_date : content.first_air_date;
    const dDay = getDDay(releaseDateStr);

    // 카드 클릭 시 상세 페이지 이동
    const handleClick = () => {
        if (!type || !content.id) return;
        navigate(`/${type}/${content.id}`);
    };

    return (
        <div className="content-card" onClick={handleClick}>
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

                    <MetaItem icon={Star} alt={'별 아이콘'} className="fade-up">
                        {content.vote_count > 0 ? content.vote_average.toFixed(1) : '-'}
                    </MetaItem>

                    {dDay && <div className="meta-item d-day-badge">{dDay}</div>}
                </>
            )}
        </div>
    );
};

export default ContentCard;
