const LOAD_POSTS = 'userPosts/GET_POSTS';
const ADD_USER_POST = 'userPosts/ADD_USER_POSTS';
const EDIT_USER_POST = 'userPosts/EDIT_USER_POSTS';
const DELETE_USER_POST = 'userPosts/DELETE_USER_POSTS';

const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}

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

export const updateUserPost = (id, caption) => async(dispatch) => {
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

export const deleteUserPost = (id) => async(dispatch) => {
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


export const getUserPosts = (id) => async(dispatch) => {

    const response = await fetch(`/api/users/${id}/posts`)


    if (response.ok) {
        const data = await response.json()

        dispatch(loadPosts(data.posts))
    }
    // add a message for no posts found
}



const userPostsReducer = (state={}, action) => {
    let newState = {}
    switch(action.type) {
        case DELETE_USER_POST:
            newState = {...state}
            delete newState[action.id]
            return newState
        case ADD_USER_POST:
            newState = {...state, [action.post.id]: action.post}
            return newState
        case EDIT_USER_POST:
            newState = {...state, [action.post.id]: action.post}
            return newState
        case LOAD_POSTS:
            action.posts.forEach(post => {
                newState[post.id] = post
            });
            return newState
        default:
            return state
    }
}

export default userPostsReducer;
