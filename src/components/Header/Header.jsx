import './Header.css';

import HeaderBar from './HeaderBar';
import HeaderSlider from './HeaderSlider';

const Header = () => {
    return (
        <header className="header">
            <HeaderBar />
            <HeaderSlider />
        </header>
    );
};

export default Header;
