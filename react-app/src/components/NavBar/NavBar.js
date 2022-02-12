import React from "react"
import { NavLink } from "react-router-dom";

import CreatePostModal from "../Post/CreatePost";
import logo from "../../images/Inspogram.jpg";
import ProfileButton from "./ProfileButton";
import "./NavBar.css";

const NavBar = ({ user }) => {

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-bar">
          <div className="left-bar">
            <NavLink to="/feed" exact={true} activeClassName="active">
              <img className="logo" src={logo} alt="logo" />
            </NavLink>
          </div>

          <div className="right-bar">
            <NavLink to="/feed" exact={true} activeClassName="active">
              <i className="fa-solid fa-house"></i>
            </NavLink>
            <CreatePostModal />
            <ProfileButton user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
