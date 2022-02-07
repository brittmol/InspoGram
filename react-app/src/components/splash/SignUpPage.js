import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import SignUpForm from "../auth/SignUpForm";
import SplashFooter from "./SplashFooter";
import { login } from "../../store/session";
import "./SplashPage.css"



function SignUpPage() {


        const dispatch = useDispatch()
        const handleDemoLogin = () => {
            const email = 'demo@aa.io'
            const password = 'password'
            dispatch(login(email, password));
        }

    return (
        <>
            <main className="splash-main">
            <div className="login-signup-container">
                    <div className="splash-login-container">
                        <div className="splash-login-heading">
                            <h1>Inspogram</h1>
                        </div>
                        <div className="header-text-container">Sign up to see photos from your friends.</div>
                        <div className="splash-login-form-container">
                            <SignUpForm />
                            <div className="demo-container">
                                <span className="or-span">OR</span>
                                <button onClick={handleDemoLogin} className="demo-button">Demo login</button>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="form-link-container">
                        <p>Have an account? <NavLink className='form-link' to="/login">Log in</NavLink></p>
                    </div>
                </div>
            </main>
            <SplashFooter />
        </>
    )
}

export default SignUpPage;
