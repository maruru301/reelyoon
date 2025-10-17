import './Header.css';

import NavMenu from './NavMenu';
import SearchBox from './SearchBox';

const Header = () => {
    return (
        <header className="header">
            <NavMenu />

            <a className="logo gradient-text" href="/">
                <div>ReelYoon</div>
            </a>

            <SearchBox />
        </header>
    );
};

export default Header;
