import { useEffect, useState, React } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "../auth/LoginForm";
import "./SplashPage.css"
import SplashPhone from "./SplashPhone";
import { login } from "../../store/session";





function SplashPage() {
    const dispatch = useDispatch()
    const handleDemoLogin = () => {
        const email='demo@aa.io'
        const password='password'
        dispatch(login(email, password));
    }

    return (
        <main className="splash-main">
            <SplashPhone />
            <div className="splash-login-container">
                <div className="splash-login-heading">
                    <h1>Inspogram</h1>
                </div>
                    <div className="splash-login-form-container">
                        <LoginForm />
                        <div className="demo-container">
                            <span className="or-span">OR</span>
                            <button onClick={handleDemoLogin} className="demo-button">Demo login</button>
                        </div>
                    </div>
                    <div>

                    </div>
                <div className="signup-link-container">
                    <p>Don't have an account? <NavLink className='signup-link' to="/signup">Sign up</NavLink></p>
                </div>
            </div>
        </main>

    )
}


export default SplashPage;
