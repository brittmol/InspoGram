import { useDispatch } from "react-redux"; //useSelector, 
import { deleteUserPost } from "../../../store/userPosts";
import EditPostModal from "./EditPost";

function PostDetails({ post, onClose }) {
    //const singlePost = useSelector(state => state.userPostsReducer[post.id])
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
        onClose()
    }
    return (
        <div>
            <div>
                {post?.caption}
            </div>
            <div>
                <img src={post?.photos[0]?.photo} alt="users-pic"></img>
            </div>
            <EditPostModal post={post}/>
            <button onClick={handleDelete} id={post.id}>Delete</button>
        </div>
    )
}

export default PostDetails;
