const LOAD_POSTS = 'userPosts/GET_POSTS';
const ADD_USER_POST = 'userPosts/ADD_USER_POSTS';
const EDIT_USER_POST = 'userPosts/EDIT_USER_POSTS';
const DELETE_USER_POST = 'userPosts/DELETE_USER_POSTS';
const ADD_USER_COMMENT = 'userPost/CREATE_POST'
const UPDATE_USER_COMMENT = 'userPost/UPDATE_USER_COMMENT'


const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

const addUserComment = (comment) => ({
    type: ADD_USER_COMMENT,
    comment
})

export const addUserPost = (post) => {
    return {
        type: ADD_USER_POST,
        post
    }
}

export const editUserPost = (post) => {
    return {
        type: EDIT_USER_POST,
        post
    }
}

const deletePost = (id) => {
    return {
        type: DELETE_USER_POST,
        id
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE_USER_COMMENT,
        comment
    }
}

export const updateUserComment = (id, comment) => async (dispatch) => {

    const response = await fetch(`/api/comments/${id}/edit`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(updateComment(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateUserPost = (id, caption) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ caption })
    })

    if (response.ok) {
        const data = await response.json()

        // dispatch(editPost(data))
        dispatch(editUserPost(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteUserPost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    })
    const data = await response.json()
    if (data.message === 'Deleted') {
        dispatch(deletePost(id))
    }
}


export const getUserPosts = (id) => async (dispatch) => {

    const response = await fetch(`/api/users/${id}/posts`)


    if (response.ok) {
        const data = await response.json()

        dispatch(loadPosts(data.posts))
    }
    // add a message for no posts found
}

export const createUserComment = (payload) => async (dispatch) => {

    const response = await fetch(`/api/posts/${payload.post_id}/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const data = await response.json()

        dispatch(addUserComment(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}






const userPostsReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case DELETE_USER_POST:
            newState = { ...state }
            delete newState[action.id]
            return newState
        case ADD_USER_POST:
            newState = { ...state, [action.post.id]: action.post }
            return newState
        case EDIT_USER_POST:
            newState = { ...state, [action.post.id]: action.post }
            return newState
        case LOAD_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState
        case ADD_USER_COMMENT:
            newState = { ...state }
            for (let post in newState.userPostsReducer) {

                if (post.id === action.comment.post_id) {
                    post.comments.push(action.comment)
                    return newState
                }
            }
            return newState
        case UPDATE_USER_COMMENT:
            newState = {...state}
            for (let post in newState) {
                if (newState[post].id === action.comment.post_id) {
                    newState[post].comments.forEach(comment => {
                        if(comment.id === action.comment.id) {
                            comment.comment = action.comment.comment
                        }
                    })
                    return newState
                }
            }
            return newState

        default:
            return state
    }
}

export default userPostsReducer;
