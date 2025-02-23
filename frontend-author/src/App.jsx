import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AppRouter from './router/Router';
import style from './app.module.scss';

function App() {
    return (
        <div className={style.appContainer}>
            <Header />
            <div className={style.appContent}>
                <AppRouter />
            </div>
            <Footer />
        </div>
    );
}

export default App;
