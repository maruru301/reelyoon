import './Header.css';

import HeaderBar from './HeaderBar/HeaderBar';
import HeaderSlider from './HeaderSlider/HeaderSlider';

const Header = () => {
    return (
        <header className="header">
            <HeaderBar />
            <HeaderSlider />
        </header>
    );
};

export default Header;
