import CommentForm from '../../Comment/AddComment';
import { Link } from 'react-router-dom';
import DisplayComment from '../../Comment/DisplayComments';
import './SinglePost.css';

const SinglePost = (post) => {
    return (
        <div className="post">
            <h2>{post.post.users.username}</h2>
            <img className="photo" src={post.post.photos[0].photo}/>
            <h2>{post.post.caption}</h2>
            <div className='comment-section'>
                {/* {(post.post.comments).map( (comment) => {
                    return <h2 key={comment.id}><Link to={`/api/users/${comment.user.id}`}>{comment.user.username}</Link>: {comment.comment}</h2>
                })} */}
                <DisplayComment comments={post.post.comments} />
            </div>
            <CommentForm id={post.post.id} />

        </div>
    )
}

export default SinglePost
