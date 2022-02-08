import CommentForm from '../../Comment';
import './SinglePost.css';

const SinglePost = (post) => {
    return (
        <div className="post">
            <h2>{post.post.caption}</h2>
            <img className="photo" src={post.post.photos[0].photo}/>
            <div className='comment-section'>
                {(post.post.comments).map( (comment) => {
                    return <h2 key={comment.id}>{comment.comment}</h2>
                })}
            </div>
            <CommentForm id={post.post.id} />


         {console.log(post)}
         {console.log(post.post.id)}
         {console.log(post.post.photos[0].photo)}
        </div>
    )
}

export default SinglePost
