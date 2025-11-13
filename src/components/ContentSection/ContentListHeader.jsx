import ContentToggleButton from './ContentToggleButton';
import { useNavigate } from 'react-router-dom';

const ContentListHeader = ({ title, state, actions, options, category }) => {
    const navigate = useNavigate();
    const { mediaType, timeWindow } = state;
    const { setMediaType, setTimeWindow } = actions;
    const { showMediaType, showTimeWindow } = options;

    const handleViewAll = () => {
        if (!mediaType || !category) return;
        navigate(`/${mediaType}/${category}`);
    };

    return (
        <div className="content-list-header">
            <div className="header-left">
                <h2 className="content-title gradient-text">{title}</h2>

                <div className="toggle-btn-container">
                    {showMediaType && (
                        <ContentToggleButton
                            options={[
                                { label: 'Movie', value: 'movie' },
                                { label: 'TV', value: 'tv' },
                            ]}
                            activeValue={mediaType}
                            onChange={setMediaType}
                        />
                    )}

                    {showTimeWindow && (
                        <ContentToggleButton
                            options={[
                                { label: 'Daily', value: 'day' },
                                { label: 'Weekly', value: 'week' },
                            ]}
                            activeValue={timeWindow}
                            onChange={setTimeWindow}
                        />
                    )}
                </div>
            </div>

            <div className="header-right">
                {category !== 'trending' && (
                    <button className="view-all-btn" onClick={handleViewAll}>
                        전체보기
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContentListHeader;
