import axios from 'axios';
import { useEffect, useState } from 'react';
import './blogList.module.scss';
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
            <h1>Blog Posts</h1>
            {posts.length === 0 ? (
                <p>No blog posts available.</p>
            ) : (
                <div className="post-grid">
                    {posts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
