import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { useSelector } from 'react-redux';
import GetUserPosts from './GetUserPosts/GetUserPosts';
import UserProfileHeader from './UserProfileHeader';
import './UserProfile.css'



function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const posts = useSelector(state => state.userPostsReducer)
  const postsList = Object.values(posts)

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <main>
      <div className='all-container'>
        <UserProfileHeader postsList={postsList} user={user} />
        <div className='profile-section-border'>&nbsp;</div>
        <GetUserPosts />
      </div>
    </main>
  );
}
export default User;
