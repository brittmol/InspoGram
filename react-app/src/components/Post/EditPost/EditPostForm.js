import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUserPost } from '../../../store/userPosts';
import "./EditPostForm.css"

const EditPostForm = ({post, onClose}) => {
    const dispatch = useDispatch()
    //const history = useHistory()

    const [caption, setCaption] = useState(post?.caption || "")
    const [errors, setErrors] = useState([])
    //const user = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = post.id

        const data = dispatch(updateUserPost(id, caption))
        if (data) {
            onClose()
        } else {
            setErrors(data)
            onClose()
            // history.push(`/api/user/${user.id}/posts`)
        }
    }

    return (
        <form className="post-edit-form-check" onSubmit={handleSubmit}>
            <h2>Edit Caption</h2>
            <div className='login-error-container'>
                {errors.map((error, ind) => (
                    <div key={error}>{error}</div>
                ))}
            </div>
            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />
            <button className="post-edit-btn" type="submit">
                Post
            </button>
        </form>
    )

}

export default EditPostForm
