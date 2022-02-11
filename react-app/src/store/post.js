// constants
import { addUserPost } from "./userPosts"
import { loadPosts } from "./userPosts"


const GET_POST = 'post/GET_POST';
const GET_LIKES = 'post/likes/GET_LIKE';
const GET_SINGLE_POST = 'post/GET_SINGLE_POST';

const ADD_POST = 'post/ADD_POST';
const ADD_LIKE = 'post/likes/ADD_LIKE';
const ADD_COMMENT = 'post/CREATE_POST';
const FOLLOW_USER = 'user/FOLLOW_USER';

const DELETE_LIKE = 'post/likes/DELETE_LIKE';
const UNFOLLOW_USER = 'user/UNFOLLOW_USER';




const getPost = (posts) => ({
    type: GET_POST,
    posts
})

const getLikes = (likes) => ({
    type: GET_LIKES,
    likes
})

const getSinglePost = (post) => ({
    type: GET_SINGLE_POST,
    post
})

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const addLike = (like) => ({
    type: ADD_LIKE,
    like
})

const followUser = (user) => ({
    type: FOLLOW_USER,
    user
})


const deleteLike = (like) => ({
    type: DELETE_LIKE,
    like
})

const unfollowUser = (user) => ({
    type: UNFOLLOW_USER,
    user
})

// CRUD FEATRURE WITH REDUX
// GET
export const getLikesByUser = (payload) => async (dispatch) => {
    const response = await fetch(`/api/users/${payload.user_id}/likes`);

    if (response.ok) {
        const likes = await response.json();

        dispatch(getLikes(likes));
        // dispatch(getUserLikes(likes.likes))
        return likes
    };
}

export const getASinglePost = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts/${payload.post_id}`);

    if (response.ok){
        const post = await response.json();
        dispatch(getSinglePost(post))
        return post
    }
}

export const getAllPost = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts/${payload.user_id}/feed`);

    if (response.ok) {
        const posts = await response.json();
        dispatch(getPost(posts));
        return posts
    };
}

// CREATE
export const createPost = (payload) => async (dispatch) => {
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


export const createComment = (payload) => async (dispatch) => {
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

export const likeAPost = (payload) => async (dispatch) => {

    const response = await fetch(`/api/posts/${payload.id}/likes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload })
    })
    if (response.ok) {
        const data = await response.json()

        dispatch(addLike(data))
        // dispatch(addUserLike(data))
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

export const followAUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/follow`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    })
    if (response.ok) {
        const data = await response.json()

        dispatch(followUser(data))
        return data
    }
}

// DELETE
export const deleteALike = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts/${payload.id}/likes/delete`,
        {
            method: 'DELETE'
        })
    if (response.ok) {

        dispatch(deleteLike(payload));
        // dispatch(deleteUserLike(payload))
        const data = await response.json()

        return response
    }
}

export const unfollowAUser = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/unfollow`)
    if (response.ok) {
        const data = await response.json()

        dispatch(unfollowUser(data))
        return data
    }
}

const postReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_POST:
            const allPosts = []
            for (let post of action.posts['posts']) {
                allPosts.push(post)
            }
            return { ...state, 'posts': allPosts }
        case GET_LIKES:
            const allLikes = action.likes['likes'];
            return { ...state, 'likes': allLikes }
        case GET_SINGLE_POST:
            newState = { ...state }
            const newPost = [...state.posts, action.post]
            newState.posts = [...state.posts, action.post]
            return newState
        case ADD_POST:
            newState = { ...state, [action.post.id]: action.post }
            return newState
        case ADD_COMMENT:
            const newObj = { ...state }
            for (let obj of newObj.posts) {
                if (obj.id === action.comment.post_id) {
                    obj.comments.push(action.comment)
                    return newObj
                }
            }
            return newObj
        case ADD_LIKE:
            newState = { ...state }
            for (let post of newState.posts) {
                if (post.id === action.like.post_id) {
                    post.likes = [...post.likes, action.like]

                    return newState
                }
            }
            return newState
        case FOLLOW_USER:
            newState = { ...state }
            return newState

        case DELETE_LIKE:
            newState = { ...state }
            for (let post of newState.posts) {
                if (post.id === action.like.id) {
                    post.likes = post.likes.filter((p) => p.post_id !== action.like.id)
                    return newState
                }
            }
            return newState
        case UNFOLLOW_USER:
            newState = { ...state }
            return newState
        default:
            return state
    }
}

export default postReducer;
