import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { authenticate } from '../../store/session';


import FollowerModal from "../Modal/FollowerModal/FollowerModal";
import FollowingModal from "../Modal/FollowingModal/FollowingModal";
import { LikeModal } from "../../context/Modal";
import cameraIcon from '../../images/camera.svg'
import uploadIcon from '../../images/upload.svg'



function UserProfileHeader({ postsList, user }) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [photoClass, setPhotoClass] = useState('profile-photo-hidden')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(authenticate())
    }, [image, photoPrev, photoClass, errors])

    const sessionUser = useSelector(state => state.session.user)
    const { userId } = useParams()

    const handleUploadPhoto = async () => {
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
            setImage(null)
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

        if (file) {
            setPhotoPrev(URL.createObjectURL(file))
            setPhotoClass('profile-photo-shown')
            setImage(file);
        }
    }

    const [showFollowerModal, setShowFollwerModal] = useState(false);
    const [showFollowingModal, setShowFollwingModal] = useState(false);

    const handleFollower = () => setShowFollwerModal(true);
    const handleFollowing = () => setShowFollwingModal(true);

    const onCloseModal = () => {
        setShowFollwerModal(false);
        setShowFollwingModal(false);
    }


    return (
        <section className='profile-heading-container'>
            <div className='profile-pic-container'>
                {/* <div className="profile-pic"> */}
                {photoPrev !== '#' ?
                    <img className={`${photoClass} profile-pic-pre profile-pic`} id='photo-upload-img' src={photoPrev} alt='your photo' />
                    : <img className='profile-pic' src={userId === '1' ? sessionUser.profile_image_url : user.profile_image_url} alt='your photo' />}
                {/* <button onClick={handleUploadPhoto}>Upload profile photo</button> */}
                {sessionUser.id === Number(userId) && (
                    <div className='save-upload-container'>
                        {image ?
                            (<label className='upload-button-header' onClick={handleUploadPhoto}>
                                <img className='save-button-header' src={uploadIcon} alt='save' />
                            </label>)
                            : (<label className='upload-label-header'>
                                <img className='upload-logo-header' src={cameraIcon} alt='upload' />
                                <input
                                    className='upload-input-header'
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhoto}
                                    id='photo-upload-input'
                                />
                                {/* <img className={photoClass} id='photo-upload-img' src={photoPrev} alt='your photo' /> */}
                            </label>)}
                    </div>
                )}
                {/* {image && (
                    <button className='upload-button-header' onClick={handleUploadPhoto}>
                        <img className='save-button-header' src={uploadIcon} alt='save' />
                    </button>
                )} */}

            </div>
            <div className='profile-info-container'>
                <div className="username-profile-heading">
                    {user?.username}
                </div>
                <div className="user-info-profile-heading">
                    <span> <b>{postsList?.length}</b> posts</span>
                    <span onClick={() => handleFollower()}><b>{user?.followers?.length}</b> followers</span>
                    {showFollowerModal && (
                        <LikeModal onClose={onCloseModal}>
                            <FollowerModal prop={user?.followers} />
                        </LikeModal>
                    )}
                    <span onClick={() => handleFollowing()}><b>{user?.following?.length}</b> following</span>
                    {showFollowingModal && (
                        <LikeModal onClose={onCloseModal}>
                            <FollowingModal prop={user?.following} />
                        </LikeModal>
                    )}
                </div>
                <div className="full-name-profile-heading">
                    {user.full_name}
                </div>
            </div>
        </section>
    )
}

export default UserProfileHeader;
