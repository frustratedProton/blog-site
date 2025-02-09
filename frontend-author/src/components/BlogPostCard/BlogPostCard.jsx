import './BlogPostCard.module.scss';

const BlogPostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.content}</p>
            <p className='author-name'>{post.author.username}</p>
        </div>
    );
};

export default BlogPostCard;
