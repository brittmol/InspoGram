import { useEffect, useState, React } from "react";


import splashPhone from '../../images/splash-phone.png';
import "./SplashPage.css";


function SplashPhone() {

    const [phoneImg, setPhoneImg] = useState("splash-feed-1")


    useEffect(() => {

        const rotateImgs = ["splash-feed-1", "splash-feed-2", "splash-feed-3"]

        let i = 1
        const intId = setInterval(() => {
            setPhoneImg(rotateImgs[i])
            i++
            if (i === rotateImgs.length) {
                i = 0
            }
        }, 6000)
        return () => clearInterval(intId)
    }, [])

    return (

            <div className="splash-phone-container">
                 <img className="splash-phone" src={splashPhone} alt="splash page phone" />
                 <div className={`splash-phone-feed ${phoneImg}`} >
                    &nbsp;
                </div>
            </div>


    )
}

export default SplashPhone;
