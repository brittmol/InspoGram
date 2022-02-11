import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import DisplayAllComments from "../../Comment/DIsplayAllComments";
import { deleteUserPost, getUserPosts } from "../../../store/userPosts";
import { getASinglePost } from "../../../store/post";
import AddCommentForm from "../../Comment/AddCommentForm";
import PostProfileLikes from "./PostProfileLikes";
import MenuModal from "./ProfileMenuModal";
// import EditPostModal from "../EditPost";
// import SinglePost from "../../Feed/SinglePost";
// import DisplayComment from "../../Comment/DisplayComments";

import "./PostDetails.css";

function PostDetails({ post, onClose }) {
  //const singlePost = useSelector(state => state.userPostsReducer[post.id])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts(post?.user_id));
    dispatch(getASinglePost({ post_id: post?.id }));
  }, [dispatch]);

  const handleDelete = (e) => {
    const id = e.target.id;
    dispatch(deleteUserPost(id));
    onClose();
  };

  return (
    <>
      <div className="profile-modal-img-container">
        <img className="profile-modal-img" src={post?.photos[0]?.photo}></img>
      </div>
      <div className="profile-modal-data-container">
        <div className="profile-modal-username">
          <NavLink onClick={onClose} to={`/users/${post?.users?.id}`}>
            {post?.users?.username}
          </NavLink>

          <MenuModal post={post} />
        </div>
        <div className="profile-modal-caption">{post?.caption}</div>
        <div>
          <DisplayAllComments comments={post.comments} />
        </div>
        <div>
          <PostProfileLikes post={post} />
        </div>
        <div>
          <AddCommentForm flag={true} id={post.id} />
        </div>
      </div>
    </>
  );
}

export default PostDetails;
