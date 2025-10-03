import ContentCard from './ContentCard';

const ContentList = ({ contents }) => {
    return (
        <section className="content-list">
            <ul>
                {contents.map((content) => (
                    <ContentCard key={content.id} content={content} />
                ))}
            </ul>
        </section>
    );
};

export default ContentList;
