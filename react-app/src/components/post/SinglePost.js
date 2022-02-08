import CommentForm from '../Comment';
import './SinglePost.css';

const SinglePost = (post) => {
    return (
        <div className="post">
            <div className='user-info'>
                <h2>{post['post'].id}</h2> {/* replace with username later*/}
            </div>
            <img className="photo" src={post['post'].Photo[0].photo}/>
            {/* Add another div of like button and comment to popup modal*/}
            <h2>{post['post'].caption}</h2>
            {/* {if (sessionUser && comment.user_id === sessionUser.id)} */}
            <div className='comment-section'>
                {(post['post'].Comment).map( (comment) => {
                    return <h2 key={comment.id}>{comment.comment}</h2>
                })}
            </div>
            < CommentForm id={post['post'].id} />
            {/* Add comment form section*/}
        </div>
    )
}

export default SinglePost
