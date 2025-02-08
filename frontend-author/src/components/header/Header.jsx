// import { Link } from 'react-router-dom';
import style from './header.module.scss';

const Header = () => {
    return (
        <header className={style.header}>
            <section className={style.logoSection}>
                <div className={style.logoText}>Blog Site</div>
            </section>
            <section className={style.navSection}>
                {/* <Link to="/about">About</Link> */}
                {/* <Link to="/contact">Contact</Link> */}
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </section>
        </header>
    );
};

export default Header;
