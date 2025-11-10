import ContentToggleButton from './ContentToggleButton';

const ContentListHeader = ({ title, state, actions, options }) => {
    const { mediaType, timeWindow } = state;
    const { setMediaType, setTimeWindow } = actions;
    const { showMediaType, showTimeWindow } = options;

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
                <button className="view-all-btn">전체보기</button>
            </div>
        </div>
    );
};

export default ContentListHeader;
