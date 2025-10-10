import HamburgerMenu from '../../assets/hamburger-menu.svg';
import { useState } from 'react';

const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
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
    );
};

export default NavMenu;
