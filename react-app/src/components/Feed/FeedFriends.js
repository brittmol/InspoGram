import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import cat from "../../images/cat.jpg";
import "./SinglePost.css";

function FeedFriends() {
  // list of friends
  const user = useSelector((state) => state.session.user);

  return (
    <div className="post friends">
      <div className="friend-profile">
        <NavLink to={`/users/${user?.id}`}>
          <img className="friends-profile-pic" src={user?.profile_image_url ? user?.profile_image_url : cat} alt="cat" />
        </NavLink>
        <div className="friends-profile-username">{user?.username}</div>
      </div>
      <div className="friend-profile">
        <NavLink to={`/users/${user?.id}`}>
          <img className="friends-profile-pic" src={cat} alt="cat" />
        </NavLink>
        <div className="friends-profile-username">Other user</div>
      </div>
    </div>
  );
}

export default FeedFriends;
