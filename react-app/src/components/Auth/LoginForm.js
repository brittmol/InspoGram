import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email.includes("@") && password.length >= 6) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [disableButton, email, password]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/feed" />;
  }

  return (
    <form className="splash-login-form" onSubmit={onLogin}>
      <div className="login-error-container">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="login-input-container">
        <div className="input-container">
          <input
            className="form-input"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>
        <div className="input-container">
          <input
            className="form-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
        <button className="form-button" disabled={disableButton} type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
