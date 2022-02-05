import { useEffect, useState, React } from "react";
import splashPhone0 from '../../images/splash-phone.png'
import splashPhone1 from '../../images/splash1.jpeg'
import splashPhone2 from '../../images/splash2.jpeg'
import splashPhone3 from '../../images/splash3.jpeg'
import splashPhone4 from '../../images/splash4.jpeg'
import "./SplashPage.css"


function SplashPhone() {

    const [phoneImg, setPhoneImg] = useState("splash-feed-1")


    useEffect(() => {
        // const rotateImgs = [splashPhone1, splashPhone2, splashPhone3, splashPhone4]
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
                 <img className="splash-phone" src={splashPhone0} alt="splash page phone image" />
                 <div className={`splash-phone-feed ${phoneImg}`} >
                    {/* <img  src={phoneImg} alt="splash page phone display" /> */}
                    &nbsp;
                </div>
            </div>


    )
}

export default SplashPhone;
