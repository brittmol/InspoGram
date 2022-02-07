import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPost } from '../../store/post'

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [caption, setCaption] = useState("")
    const [photo, setPhoto] = useState("")
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {caption, photo}

        const post = await dispatch(createPost(payload))

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
            />
            <input
                type="text"
                placeholder="insert URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <button type="submit">
                Share
            </button>
        </form>
    )

}

export default CreatePostForm
