const ContentToggleButton = ({ options, activeValue, onChange }) => {
    return (
        <div className="content-header-btn">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    className={activeValue === opt.value ? 'active' : ''}
                    onClick={() => onChange(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

export default ContentToggleButton;
