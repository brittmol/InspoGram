import React, { useState } from 'react' // useEffect,
//import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUserPost } from '../../../store/userPosts'
//import { useSelector } from 'react-redux'

const EditPostForm = ({post, onClose}) => {
    const dispatch = useDispatch()
    //const history = useHistory()

    const [caption, setCaption] = useState(post?.caption || "")
    const [errors, setErrors] = useState([])
    //const user = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = post.id

        const data = await dispatch(updateUserPost(id, caption))
        if (data) {
            setErrors(data)
        } else {
            onClose()
            // history.push(`/api/user/${user.id}/posts`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Caption</h2>
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
            <button type="submit">
                Post
            </button>
        </form>
    )

}

export default EditPostForm
