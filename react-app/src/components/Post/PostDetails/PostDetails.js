import { useSelector, useDispatch } from "react-redux";
import { deleteUserPost } from "../../../store/userPosts";

function PostDetails({ post, onClose }) {
    const singlePost = useSelector(state => state.userPostsReducer[post.id])
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
        onClose()
    }
    return (
        <div>
            in modal {post.id}
            <div>
                {post?.photos[0]?.photo}
            </div>
            <button onClick={handleDelete} id={post.id}>Delete</button>
        </div>
    )
}

export default PostDetails;
