import cat from '../../images/cat.jpg'


function UserProfileHeader({ postsList, user }) {
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
