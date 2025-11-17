import CollectionSection from '../sections/CollectionSection/CollectionSection';
import CreditsSection from '../sections/CreditsSection/CreditsSection';
import RecommendedSection from '../sections/RecommendedSection/RecommendedSection';

const TabContent = ({ activeTab, details, id, type }) => {
    switch (activeTab) {
        case 'credits':
            return <CreditsSection directors={details.directors} cast={details.cast} />;
        case 'recommended':
            return <RecommendedSection id={id} type={type} />;
        case 'collection':
            return type === 'movie' ? <CollectionSection id={id} /> : null;
        default:
            return null;
    }
};

export default TabContent;
