import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './PostDetail.module.scss';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:3001/api/post/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPost(response.data);
            } catch (error) {
                setError(`Failed to fetch post, ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <article
            aria-labelledby={`post-title-${post.id}`}
            className="style.hero"
        >
            <header>
                <h1 id={`post-title-${post.id}`} className={style.heroText}>
                    {post.title}
                </h1>

                <p>
                    <span>By {post.author.username}</span>/
                    <span>
                        <time dateTime={post.createdAt}>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </time>
                    </span>
                </p>
            </header>

            <section aria-labelledby={`post-content-${post.id}`} className={style.container}>
                <h2 id={`post-content-${post.id}`}>Content</h2>
                <p>{post.content}</p>
            </section>
        </article>
    );
};

export default PostDetails;
