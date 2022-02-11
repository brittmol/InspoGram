import React, { useState } from "react";

import FollowerModal from "../Modal/FollowerModal/FollowerModal";
import FollowingModal from "../Modal/FollowingModal/FollowingModal";
import { LikeModal } from "../../context/Modal";
import cat from '../../images/cat.jpg';

function UserProfileHeader({ postsList, user }) {
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
                    <img className='profile-pic' src={cat} alt='cat' />
                {/* </div> */}
            </div>
            <div className='profile-info-container'>
                <div className="username-profile-heading">
                    {user?.username}
                </div>
                <div className="user-info-profile-heading">
                    <span> <b>{postsList?.length}</b> posts</span>
                    <span onClick={ () => handleFollower() }><b>{user?.followers?.length}</b> followers</span>
                    {showFollowerModal && (
                        <LikeModal onClose={onCloseModal}>
                            <FollowerModal prop={user?.followers}/>
                        </LikeModal>
                    )}
                    <span onClick={ () => handleFollowing() }><b>{user?.following?.length}</b> following</span>
                    {showFollowingModal && (
                        <LikeModal onClose={onCloseModal}>
                            <FollowingModal prop={user?.following}/>
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
