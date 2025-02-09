import { Routes, Route } from 'react-router';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import BlogList from '../components/blogList/BlogList';
import Footer from '../components/footer/Footer';
import Login from '../components/auth/login/Login';

const AppRouter = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Hero />
                            <BlogList />
                        </>
                    }
                />
                <Route path="login" element={<Login />} />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRouter;
