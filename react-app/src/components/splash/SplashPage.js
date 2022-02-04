import { useEffect, useState, React } from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import "./SplashPage.css"
import splashPhone from '../../images/splash-phone.png'
import splashPhone1 from '../../images/splash1.jpeg'
import splashPhone2 from '../../images/splash2.jpeg'
import splashPhone3 from '../../images/splash3.jpeg'
import splashPhone4 from '../../images/splash4.jpeg'


function SplashPage() {
    const [phoneImg, setPhoneImg] = useState(splashPhone1)

    useEffect(() => {
        const rotateImgs = [splashPhone1, splashPhone2, splashPhone3, splashPhone4]
        let i = 1
        const intId = setInterval(() => {
            setPhoneImg(rotateImgs[i])
            i++
            if (i === rotateImgs.length) {
                i = 0
            }
        }, 3500)
        return () => clearInterval(intId)
    }, [])

    return (
        <>
        <img src={phoneImg} />
        </>
    )
}


export default SplashPage;
