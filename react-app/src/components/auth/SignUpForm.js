import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat_password, setRepeatPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email.includes('@') && password.length >= 6 && username.length >= 2
        && full_name.length >=4 && repeat_password === password
    ) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }, [disableButton, email, password, repeat_password, username, full_name])

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, full_name, repeat_password));
      if (data) {
        setErrors(data)
      }
    // }
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  // const updateFullname = (e) => {
  //   setFullName(e.target.value);
  // }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form autoComplete="off" className='splash-login-form' onSubmit={onSignUp}>
      <div className='login-error-container'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='login-input-container'>
        <div className='input-container'>
          <input
            placeholder='Full Name'
            className='form-input'
            type='text'
            name='full_name'
            onChange={updateFullName}
            value={full_name}
          ></input>
          <label className='form-label'>Full Name</label>
        </div>
        <div className='input-container'>
          <input
            placeholder='User Name'
            className='form-input'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          <label className='form-label'>User Name</label>
        </div>
        <div className='input-container'>
          <input
            placeholder='Email'
            className='form-input'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          <label className='form-label'>Email</label>
        </div>
        <div className='input-container'>
          <input
            placeholder='Password'
            className='form-input'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          <label className='form-label'>Password</label>
        </div>
        <div className='input-container'>
          <input
            placeholder='Repeat Password'
            className='form-input'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeat_password}
            required={true}
          ></input>
          <label className='form-label'>Repeat Password</label>
        </div>
        <button disabled={disableButton} className='form-button' type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
