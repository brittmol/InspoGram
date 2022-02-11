import { Link } from "react-router-dom";

function SplashFooter() {
    return (
        <footer className="splash-footer">
            <p className="splash-footer-paragraph">
                 &copy; 2022 InspoGram by <Link
                to={{ pathname: "https://www.linkedin.com/in/brittany-moliver-5673521b2/" }} target="_blank"
                >Brittany Moliver</Link>, <Link
                to={{ pathname: "https://www.linkedin.com/in/meganmckenna1/" }} target="_blank"
                >Megan McKenna</Link>, <Link
                to={{ pathname: "https://www.linkedin.com/in/petershin731/" }} target="_blank"
                >Peter Shin</Link> and <Link
                to={{ pathname: "https://www.linkedin.com/in/vladimir-radovanovic-476311224/" }} target="_blank"
                >Vladimir Radovanovic</Link>
            </p>
            <p className="splash-footer-paragraph">
                 &copy; Github Links: <Link
                to={{ pathname: "https://github.com/brittmol" }} target="_blank"
                >Brittany Moliver</Link>, <Link
                to={{ pathname: "https://github.com/memckenna" }} target="_blank"
                >Megan McKenna</Link>, <Link
                to={{ pathname: "https://github.com/PeterShinnn" }} target="_blank"
                >Peter Shin</Link> and <Link
                to={{ pathname: "https://github.com/VladimirRadovanovic" }} target="_blank"
                >Vladimir Radovanovic</Link>
            </p>



        </footer>
    )
}

export default SplashFooter;
