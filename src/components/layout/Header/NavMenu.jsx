import HamburgerMenu from '../../../assets/hamburger-menu.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavMenu = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setMenuOpen(false); // 메뉴 닫기
    };

    return (
        <nav className="nav">
            <button className="menu-btn" onClick={() => setMenuOpen((isOpen) => !isOpen)}>
                <img src={HamburgerMenu} alt="메뉴 버튼" />
            </button>

            <ul className={`menu-list ${menuOpen ? 'open' : ''}`}>
                <li>
                    <button onClick={() => handleNavigation('/movie')}>영화</button>
                </li>
                <li>
                    <button onClick={() => handleNavigation('/tv')}>TV 프로그램</button>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
