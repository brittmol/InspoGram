import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProtectedRoute from '../Auth/ProtectedRoute';
import GetUserPosts from '../Post/GetUserPosts/GetUserPosts';
import './UserProfile.css'


function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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
        <section className='user-profile-container'>
          <div className='profile-pic'>
          </div>
          <div className='profile-info-container'>
            <div>
              <strong>User Id</strong> {userId}
            </div>
            <div>
              <strong>Username</strong> {user.username}
            </div>
            <div>
              <strong>Email</strong> {user.email}
            </div>
          </div>
          <div>
          </div>
        </section>
        <GetUserPosts />
      </div>
    </main>
  );
}
export default User;
