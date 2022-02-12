import React, { useState } from 'react' 
import { useDispatch } from 'react-redux'
import { updateUserComment } from '../../store/userPosts'
import "./EditCommentForm.css";

const EditCommentForm = ({pastComment, onClose}) => {
    const dispatch = useDispatch()

    const [comment, setComment] = useState(pastComment?.comment || "")
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = pastComment.id

        const data = dispatch(updateUserComment(id, comment))
        if (data) {
            onClose()
        } else {
            setErrors(data)
            onClose()
            // history.push(`/api/user/${user.id}/posts`)
        }
    }

    return (
        <form className="class-name-check" onSubmit={handleSubmit}>
            <h2>Edit Comment</h2>
            {/* <div className='login-error-container'>
                {errors?.map((error, ind) => (
                    <div key={error}>{error}</div>
                ))}
            </div> */}
            <textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="edit-comment-btn" type="submit">
                Update Comment
            </button>
        </form>
    )

}

export default EditCommentForm
