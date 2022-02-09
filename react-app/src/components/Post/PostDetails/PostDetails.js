import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserPost } from "../../../store/userPosts";
import EditPostModal from "./EditPost";
import './PostDetails.css'
import MenuModal from "./ProfileMenuModal";


function PostDetails({ post, onClose }) {
    //const singlePost = useSelector(state => state.userPostsReducer[post.id])
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        const id = e.target.id
        dispatch(deleteUserPost(id))
        onClose()
    }
    return (
        <>
            <div className="profile-modal-img-container">
                <img className="profile-modal-img" src={post?.photos[0]?.photo} ></img>
            </div>
            <div className="profile-modal-data-container">
                <div className="profile-modal-username">
                    <NavLink onClick={onClose} to={`/users/${post?.users?.id}`}>{post?.users?.username}</NavLink>
                    {/* <span className="">. . .</span> */}
                    {/* <i className="fa-solid fa-ellipsis"></i> */}
                    <MenuModal post={post} />
                </div>
                <div className="profile-modal-caption" >
                    {post?.caption}
                    <EditPostModal post={post} />
                </div>
                <button onClick={handleDelete} id={post.id}>Delete</button>
            </div>
        </>
    )
}

export default PostDetails;
