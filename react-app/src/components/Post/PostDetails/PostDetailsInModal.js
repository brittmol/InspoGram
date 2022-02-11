import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteUserPost } from "../../../store/userPosts";
import EditPostModal from "../EditPost";
import "./PostDetails.css";
import MenuModal from "./ProfileMenuModal";
// import DisplayComment from "../../Comment/DisplayComments";
import AddCommentForm from "../../Comment/AddCommentForm";
import DisplayAllComments from "../../Comment/DIsplayAllComments";
import SinglePost from "../../Feed/SinglePost";
import PostProfileLikes from "./PostProfileLikes";
import cat from "../../../images/cat.jpg";

function PostDetails({ post, onClose }) {
  //const singlePost = useSelector(state => state.userPostsReducer[post.id])
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    const id = e.target.id;
    dispatch(deleteUserPost(id));
    onClose();
  };
  console.log("!!!!!!!!!!!!!!!!!!!!");
  console.log(";;;;;;;;;;;;;;;;", post.users);

  return (
    <>
      <div className="profile-modal-img-container">
        <img className="profile-modal-img" src={post?.photos[0]?.photo}></img>
      </div>
      <div className="profile-modal-data-container">
        <div className="profile-modal-top">
          <div className="profile-modal-username singular-comment-container">
            <NavLink to={`/users/${post?.users?.id}`}>
              <img className="profile-pic-comment user" src={cat} alt="cat" />
            </NavLink>
            <NavLink
              to={`/users/${post?.users?.id}`}
              className="comment-username"
            >
              {post?.users?.username}
            </NavLink>
            <MenuModal post={post} />
          </div>
          <div className="profile-modal-caption singular-comment-container">
            <NavLink to={`/users/${post?.users?.id}`} activeClassName="active">
              <img className="profile-pic-comment user" src={cat} alt="cat" />
            </NavLink>
            <NavLink
              to={`/users/${post?.users?.id}`}
              className="comment-username"
            >
              {post?.users?.username}
            </NavLink>
            <p className="actual-comment">{post.caption}</p>
          </div>
        </div>
        <div className="profile-modal-comments">
          <DisplayAllComments comments={post.comments} />
        </div>
        <div className="profile-modal-bottom">
          <div>
            <PostProfileLikes post={post} />
          </div>
          <div>
            <AddCommentForm flag={true} id={post.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
