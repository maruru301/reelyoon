import ContentToggleButton from './ContentToggleButton';

const ContentListHeader = ({ title, state, actions, options }) => {
    const { mediaType, timeWindow } = state;
    const { setMediaType, setTimeWindow } = actions;
    const { showMediaType, showTimeWindow } = options;

    return (
        <div className="content-list-header">
            <h2 className="content-title gradient-text">{title}</h2>

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
    );
};

export default ContentListHeader;
