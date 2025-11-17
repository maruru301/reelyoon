import './ContentCard.css';

import ContentCardSkeleton from '../Skeleton/ContentCardSkeleton';
import MetaItem from './MetaItem';
import Star from '../../assets/star.svg';
import { formatContentData } from '../../utils/formatContentData';
import { getDDay } from '../../utils/getDDay';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ContentCard = ({ content, mediaType }) => {
    const [imgLoaded, setImgLoaded] = useState(!content.poster_path);

    const navigate = useNavigate();
    const type = mediaType || content.media_type;

    const { displayTitle, releaseYear, rawDate, posterUrl } = formatContentData(content);
    const contentTitle = releaseYear ? `${displayTitle} (${releaseYear})` : displayTitle;
    const dDay = getDDay(rawDate);

    // 카드 클릭 시 상세 페이지 이동
    const handleClick = () => {
        if (!type || !content.id) return;
        navigate(`/detail/${type}/${content.id}`);
    };

    return (
        <div className="content-card" onClick={handleClick}>
            {!imgLoaded && <ContentCardSkeleton />}

            <img
                src={posterUrl}
                alt={displayTitle}
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
