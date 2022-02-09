
import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutButton from '../Auth/LogoutButton';
import CreatePostModal from '../Post/CreatePost';
import './NavBar.css'
import logo from '../../images/Inspogram.jpg'
import cat from '../../images/cat.jpg'



const NavBar = ({user}) => {
  return (
    <nav>
      <div className='left-bar'>
        <NavLink to='/feed' exact={true} activeClassName='active'>
          <img className='logo' src={logo} alt='logo' />
          {/* <p className='logo'>Inspogram</p> */}
        </NavLink>
      </div>
      <div className='right-bar'>
        <NavLink to='/feed' exact={true} activeClassName='active'>
          <i className="fas fa-home"></i>
          {/* <i className="fa-solid fa-house"></i> */}
        </NavLink>
        <CreatePostModal />
        <NavLink to={`/users/${user.id}`} activeClassName='active'>
          <img className='profile-pic-nav' src={cat} alt='cat' />
        </NavLink>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
