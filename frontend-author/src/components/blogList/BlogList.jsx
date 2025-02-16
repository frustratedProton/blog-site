import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './blogList.module.scss';
import BlogPostCard from '../BlogPostCard/BlogPostCard';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'http://localhost:3001/api/post',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPosts(response.data);
            } catch (error) {
                setError(`Failed to fetch posts, ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {posts.length === 0 ? (
                <p>No blog posts available.</p>
            ) : (
                <section className={style.postGrid}>
                    <h1>Blog Posts</h1>
                    <div className={style.gridContainer}>
                        {posts.map((post) => (
                            <BlogPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogList;
