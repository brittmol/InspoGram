import React, { useState, useEffect } from 'react' //useEffect,
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../store/post'
import { useSelector } from 'react-redux'
import { getUserPosts } from '../../../store/userPosts'
import './Post.css'


const CreatePostForm = ({onClose}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [photoClass, setPhotoClass] = useState('photo-hidden')

    const [caption, setCaption] = useState("")
    // const [photo, setPhoto] = useState("")
    const [errors, setErrors] = useState([])
    const user = useSelector(state => state.session.user);


    // const {userId} = useParams()
    // useEffect(() => {
    //     dispatch(getUserPosts(userId))
    // }, [userId, image, imageLoading])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption)
        setImageLoading(true);

        // const payload = { caption, photo }

        const data = await dispatch(createPost(formData))


        if (data) {
            setErrors(data)
            setImageLoading(false);
        } else {
            setImageLoading(false)
            setPhotoPrev('#')
            onClose()
            history.push(`/users/${user.id}`)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        if(file) {
            setPhotoPrev(URL.createObjectURL(file))
            setPhotoClass('photo-shown')
            setImage(file);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <div className='login-error-container'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>

                ))}
            </div>
            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              id='photo-upload-input'
            />
            <img className={photoClass} id='photo-upload-img' src={photoPrev} alt='your photo' />
            <button type="submit">Post</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )

}

export default CreatePostForm
