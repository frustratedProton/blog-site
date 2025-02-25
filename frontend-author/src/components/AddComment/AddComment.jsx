/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './AddComment.module.scss';

const AddComments = ({ postId, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    'http://localhost:3001/api/user/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(res.data.user)
                setUser(res.data.user);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch user profile.');
            }
        };
        fetchUser();
    }, []);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:3001/api/posts/${postId}/comments`,
                {
                    content: newComment,
                    email: user?.email,
                    username: user?.username || 'Anonymous',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNewComment('');
            onCommentAdded(response.data.comment);
        } catch (err) {
            setError(`Failed to add comment: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={style.addComment}>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                rows={3}
            />
            <button onClick={handleAddComment} disabled={loading || !user}>
                {loading ? 'Posting...' : 'Post Comment'}
            </button>
            {!user && !loading && <div>Loading user information...</div>}
        </div>
    );
};

export default AddComments;
