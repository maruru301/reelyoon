import './Header.css';

import HamburgerMenu from '../../assets/hamburger-menu.svg';
import SearchBox from './SearchBox';
import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-bar">
                <nav className="nav">
                    <button className="menu-btn" onClick={() => setMenuOpen((isOpen) => !isOpen)}>
                        <img src={HamburgerMenu} alt="메뉴 버튼" />
                    </button>

                    <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
                        <li>
                            <a href="/movie">영화</a>
                        </li>
                        <li>
                            <a href="/tv">TV 프로그램</a>
                        </li>
                        <li>
                            <a href="/person">인물</a>
                        </li>
                    </ul>
                </nav>

                <a className="logo gradient-text" href="/">
                    <div>ReelYoon</div>
                </a>

                <SearchBox />
            </div>

            <div className="header-slider">{/* Popular 영화 몇 개 슬라이드 */}</div>
        </header>
    );
};

export default Header;
