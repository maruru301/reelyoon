import CollectionSection from '../CollectionSection/CollectionSection';
import CreditsSection from '../CreditsSection/CreditsSection';
import RecommendedSection from '../RecommendedSection/RecommendedSection';

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
