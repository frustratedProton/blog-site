/* eslint-disable react/prop-types */
import style from './BlogPostCard.module.scss';

const BlogPostCard = ({ post }) => {
    return (
        <div className={style.postCard}>
            <h2 className={style.postTitle}>{post.title}</h2>
            <p className={style.postBody}>{post.content}</p>
            <p className={style.postBody}>Written by - {post.author.username}</p>
        </div>
    );
};

export default BlogPostCard;
