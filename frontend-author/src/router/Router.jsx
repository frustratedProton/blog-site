import { Routes, Route } from 'react-router';
import Hero from '../components/hero/Hero';
import BlogList from '../components/blogList/BlogList';
import Login from '../components/auth/login/Login';
import PostDetails from '../components/postdetails/PostDetail';

const AppRouter = () => {
    return (
        <>
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
                <Route path="posts/:id" element={<PostDetails />} />
            </Routes>
        </>
    );
};

export default AppRouter;
