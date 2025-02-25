import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './Comments.module.scss';
import AddComments from '../AddComment/AddComment';

const PostComments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:3001/api/posts/${id}/comments`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setComments(response.data);
            } catch (error) {
                setError(`Failed to fetch comments, ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [id]);

    const handleNewComments = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className={style.commentSection}>
            <h3>Comments</h3>
            <AddComments postId={id} onCommentAdded={handleNewComments} />
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className={style.comment}>
                        <div className={style.commentHeader}>
                            {comment.username}
                        </div>
                        <p className={style.commentContent}>
                            {comment.content}
                        </p>
                    </div>
                ))
            ) : (
                <p>No comments available.</p>
            )}
        </section>
    );
};

export default PostComments;
