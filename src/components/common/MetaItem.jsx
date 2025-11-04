const MetaItem = ({ icon, alt, children, className = '' }) => {
    return (
        <div className={`meta-item ${className}`}>
            <img src={icon} alt={alt} />
            <span>{children}</span>
        </div>
    );
};

export default MetaItem;
