import ContentListHeader from './ContentListHeader';
import ContentSwiper from './ContentSwiper';
import useContents from '../../hooks/useContents';
import useSwiperNavigation from '../../hooks/useSwiperNavigation';

const ContentList = ({ title, contentsFetcher, showMediaType = false, showTimeWindow = false }) => {
    const { swiperRef, prevRef, nextRef } = useSwiperNavigation();

    const {
        data: { contents, SKELETON_COUNT },
        state: { loading, mediaType, timeWindow },
        actions: { setMediaType, setTimeWindow },
    } = useContents(title, contentsFetcher);

    return (
        <section className="content-list">
            <ContentListHeader
                title={title}
                state={{ mediaType, timeWindow }}
                actions={{ setMediaType, setTimeWindow }}
                options={{ showMediaType, showTimeWindow }}
            />

            <ContentSwiper
                data={{ contents, SKELETON_COUNT }}
                state={{ mediaType, loading }}
                refs={{ swiperRef, prevRef, nextRef }}
            />
        </section>
    );
};

export default ContentList;
