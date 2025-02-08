import style from './hero.module.scss';

const Hero = () => {
    return (
        <main className={style.hero}>
            <h1 className={style.heroText}>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                {/* <p>
                    Dicta recusandae consequatur dolor minima facere reprehenderit.
                </p> */}
            </h1>
        </main>
    );
};

export default Hero;
