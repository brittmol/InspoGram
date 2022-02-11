import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  deleteALike,
  getAllPost,
  getLikesByUser,
  likeAPost,
} from "../../store/post";
// import { getUserPosts } from "../../store/userPosts";
import ShowLikesModal from "../Modal/LikesModal/ShowLikesModal";
import FeedCommentForm from "../Comment/FeedComment";
import { LikeModal } from "../../context/Modal";
import cat from "../../images/cat.jpg";
import "./SinglePost.css";

const SinglePost = (id) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);
  const likes = useSelector((state) => state.post.likes);
  const sessionUser = useSelector((state) => state.session.user);
  // const userPosts = useSelector(state => state.userPostsReducer);

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  let post = posts.filter((e) => e.id === id.id);

  useEffect(() => {
    const payload = {
      user_id: sessionUser?.id,
    };
    // dispatch(getUserPosts(payload.id))
    dispatch(getAllPost(payload));
    dispatch(getLikesByUser(payload));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    setLikeCount(post[0]?.likes.length);
    setLike(likes?.includes(post[0]?.id));
  }, [likes]);

  const handleClick = () => {
    like ? setLike(false) : setLike(true);
    like
      ? dispatch(deleteALike({ id: post[0]?.id }))
      : dispatch(likeAPost({ id: post[0]?.id }));
    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  return (
    <div className="post">
      <div className="post-owner-header">
        {/* <div className="user-info"> */}
        <img className="post-profile-pic" src={cat} alt="cat" />
        <Link to={`/users/${post[0]?.user_id}`}>
          <h2 className="post-owner">{post[0]?.users.username}</h2>
        </Link>
        {/* </div> */}
        {/* <span className="drop-menu">. . .</span> */}
      </div>
      <img className="photo" src={post[0]?.photos[0].photo} alt="users-pic" />
      <div className="s-media-btn">
        <div className="like-btn s-button" onClick={() => handleClick()}>
          {like ? (
            <i className="fas fa-heart liked"></i>
          ) : (
            <i className="far fa-heart not-liked"></i>
          )}
        </div>
        <div className="comment-btn s-button">
          <i className="far fa-comment"></i>
        </div>
      </div>

      {likeCount > 0 ? (
        <div className="post-likes">
          Liked by
          <Link to="#" onClick={() => handleModal()}>
            {" "}
            {likeCount} others
          </Link>
          {showModal && (
            <LikeModal onClose={onCloseModal}>
              <ShowLikesModal post={post[0]} onClose={onCloseModal} />
            </LikeModal>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="post-caption">
        <Link to={`/users/${post[0]?.users.id}`}>
          {post[0]?.users.username}{" "}
        </Link>
        <p className="caption">{post[0]?.caption}</p>
      </div>
      <div className="comment-section">
        <FeedCommentForm id={post[0]?.id} />
        {/* <DisplayComment id={post[0]?.id} /> */}
      </div>
    </div>
  );
};

export default SinglePost;
