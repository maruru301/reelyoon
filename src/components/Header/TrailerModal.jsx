import './TrailerModal.css';

const TrailerModal = ({ isTrailerOpen, trailerUrl, onClose }) => {
    if (!isTrailerOpen) return null;

    return (
        <div
            className="trailer-bg"
            onClick={onClose} // 배경 클릭 시 닫기
        >
            <div
                className="trailer-box"
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={trailerUrl}
                    title="Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default TrailerModal;
