// constants
import { addUserPost } from "./userPosts"

const ADD_POST = 'post/ADD_POST'
const GET_POST = 'post/GET_POST'
const GET_LIKES = 'like/GET_LIKE'
const ADD_COMMENT = 'post/CREATE_POST'

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const getPost = (posts) => ({
    type: GET_POST,
    posts
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

// Thunk
export const createPost = (payload) => async(dispatch) => {
    const response = await fetch(`/api/posts/create_post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addPost(data))
        dispatch(addUserPost(data))
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

export const getLikesByUser = (payload) => async(dispatch) => {
    const response = await fetch(`/api/users/${payload.id}/likes`);

    if (response.ok){
        const likes = await response.json();
        dispatch(getLikes(likes));
        return likes
    };
}

export const getAllPost = (payload) => async(dispatch) => {
    const response = await fetch(`/api/posts/${payload.id}/feed`);

    if (response.ok){
        const posts = await response.json();
        dispatch(getPost(posts));
        return posts
    };
}

export const createComment = (payload) => async(dispatch) =>{
    const response = await fetch(`/api/posts/${payload.post_id}/comment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data))
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


const postReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case ADD_POST:
            newState = {...state, [action.post.id]: action.post}
            return newState
        case GET_POST:
            const allPosts = []
            for (let post of Object.values(action.posts)){
                allPosts.push(...post)
            }
            return { ...state, 'posts': allPosts}
        case ADD_COMMENT:
            return { ...state }
        case GET_LIKES:
            const allLikes = action.likes['likes'];
            
            return { ...state, 'likes': [...allLikes] }
        default:
            return state
    }
}

export default postReducer;
