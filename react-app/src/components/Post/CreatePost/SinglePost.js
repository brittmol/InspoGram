import CommentForm from '../../Comment/AddComment';
import { Link } from 'react-router-dom';
import DisplayComment from '../../Comment/DisplayComments';
import './SinglePost.css';



const SinglePost = (post, user) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);

    // const [like, setLike] = useState(false)

    // useEffect(() => {
    //     dispatch(likeAPost())
    // }, [dispatch])

    return (
        <div className="post">
            {console.log(new Date(post.post.created_at).toDateString())}
            <Link to={`/users/${post.post.users.id}`}>
                <h2 className='post-owner'>{post.post.users.username}</h2>
            </Link>
            <img className="photo" src={post.post.photos[0].photo}/>
            <div className='s-media-btn'>
                <div className='like-btn s-button'
                    onClick={() => console.log("Hello World")}
                >

                    {/* <i className="far fa-heart"></i> */}
                    <i className="fas fa-heart liked"></i>
                </div>
                <div className='comment-btn s-button'>
                    <i className="far fa-comment"></i>
                </div>
            </div>
            {post.post.likes.length > 0 ?
                <div className='post-likes'>
                    Liked by
                    <Link to="#"> {post.post.likes.length} others</Link>
                </div> :
                <></>
            }
            <div className='post-caption'>
                <Link to={`/users/${post.post.users.id}`}>{post.post.users.username}  </Link>
                <p className='caption'>{post.post.caption}</p>
            </div>
            <div className='comment-section'>
                <DisplayComment comments={post.post.comments} />
            </div>
            <CommentForm id={post.post.id} />

        </div>
    )
}

export default SinglePost
