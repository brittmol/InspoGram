import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/UserProfile/User';
import { authenticate } from './store/session';
import LoginPage from './components/splash/LoginPage';
import SignUpPage from './components/splash/SignUpPage';

import FeedPage from './components/Feed/FeedPage';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);


  useEffect(() => {
    (async() => {
      dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar user={user} />
      }

      <Switch>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpPage />
        </Route>
        <Route path='/feed' >
          <FeedPage />
        </Route>
        <Route path='/users' exact={true} >
          <UsersList/>
        </Route>
        <Route path='/users/:userId' >
          <User />
        </Route>
        <ProtectedRoute path='/users/:userId/posts/:postId' >
          {/* <User /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
