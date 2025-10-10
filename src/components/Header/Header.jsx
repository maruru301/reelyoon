import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-bar">
                <nav className="nav">hamberger</nav>

                <a className="logo gradient-text" href="/">
                    <div>ReelYoon</div>
                </a>

                <div className="search-box">search</div>
            </div>

            <div className="header-slider">{/* Popular 영화 몇 개 슬라이드 */}</div>
        </header>
    );
};

export default Header;
