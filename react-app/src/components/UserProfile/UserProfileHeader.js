import { useParams } from 'react-router-dom'
import cat from '../../images/cat.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { authenticate } from '../../store/session';



function UserProfileHeader({ postsList, user }) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [photoClass, setPhotoClass] = useState('profile-photo-hidden')
    const [errors, setErrors] = useState([])

    // useEffect(() => {
    //     dispatch(authenticate())
    // }, [])

    const sessionUser = useSelector(state => state.session.user)
    const { userId } = useParams()

    const handleUploadPhoto = async() => {
        const formData = new FormData();
        formData.append("image", image);

        setImageLoading(true);


        const res = await fetch('/api/photos/upload-profile-photo', {
            method: "PUT",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            dispatch(authenticate())
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            // ADD ERROR DISPLAYING HERE!!!!!!!!!
            console.log("error");
        }
    }


    const photo = user.profile_image_url
    const handlePhoto = (e) => {
        // dispatch(uploadProfilePhoto(image))
        const file = e.target.files[0];

        if(file) {
            setPhotoPrev(URL.createObjectURL(file))
            setPhotoClass('profile-photo-shown')
            setImage(file);
        }
    }

    return (
        <section className='profile-heading-container'>
            <div className='profile-pic-container'>
                {/* <div className="profile-pic"> */}
                <img className='profile-pic' src={sessionUser.profile_image_url} alt='cat' />
                {/* <button onClick={handleUploadPhoto}>Upload profile photo</button> */}
                {sessionUser.id === Number(userId) && (
                <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    id='photo-upload-input'
                />
                <img className={photoClass} id='photo-upload-img' src={photoPrev} alt='your photo' />
                </div>
                )}
                {image && (
                    <button onClick={handleUploadPhoto}>Save photo</button>
                )}

            </div>
            <div className='profile-info-container'>
                <div className="username-profile-heading">
                    {user?.username}
                </div>
                <div className="user-info-profile-heading">
                    <span> <b>{postsList?.length}</b> posts</span>
                    <span><b>{user?.followers?.length}</b> followers</span>
                    <span><b>{user?.following?.length}</b> following</span>
                </div>
                <div className="full-name-profile-heading">
                    {user.full_name}
                </div>
            </div>
        </section>
    )
}

export default UserProfileHeader;
