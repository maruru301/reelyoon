import './HeaderBar.css';

import NavMenu from './NavMenu';
import SearchBox from './SearchBox';

const HeaderBar = () => {
    return (
        <div className="header-bar">
            <NavMenu />

            <a className="logo gradient-text" href="/">
                <div>ReelYoon</div>
            </a>

            <SearchBox />
        </div>
    );
};

export default HeaderBar;
