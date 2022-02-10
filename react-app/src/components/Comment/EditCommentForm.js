import React, { useState } from 'react' // useEffect,
//import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateUserComment } from '../../store/userPosts'
//import { useSelector } from 'react-redux'

const EditCommentForm = ({pastComment, onClose}) => {
    const dispatch = useDispatch()
    //const history = useHistory()

    const [comment, setComment] = useState(pastComment?.comment || "")
    const [errors, setErrors] = useState([])
    //const user = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const id = pastComment.id

        const data = await dispatch(updateUserComment(id, comment))
        if (data) {
            setErrors(data)
        } else {
            onClose()
            // history.push(`/api/user/${user.id}/posts`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Comment</h2>
            <div className='login-error-container'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">
                Update Comment
            </button>
        </form>
    )

}

export default EditCommentForm
