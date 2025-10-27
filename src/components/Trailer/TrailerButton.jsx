import './TrailerButton.css';

import PlayBtn from '../../assets/play-btn.svg';

const TrailerButton = ({ trailerKey, onClick }) => {
    return (
        <button className="trailer-btn" onClick={() => onClick(trailerKey)}>
            <img src={PlayBtn} alt="재생 버튼" />
            <span>Play</span>
        </button>
    );
};

export default TrailerButton;
