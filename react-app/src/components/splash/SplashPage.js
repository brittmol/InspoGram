import { useEffect, useState, React } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import "./SplashPage.css"
import SplashPhone from "./SplashPhone";




function SplashPage() {


    return (
        <main className="splash-main">
            <SplashPhone />
            <div className="splash-login-container">
                <div className="splash-login-heading">
                    <h1>Inspogram</h1>
                </div>
                <div className="splash-login-form-container">
                    <LoginForm />
                </div>
            </div>
        </main>

    )
}


export default SplashPage;
