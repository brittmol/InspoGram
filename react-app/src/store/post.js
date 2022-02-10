// constants
import { addUserPost } from "./userPosts"
import { loadPosts } from "./userPosts"


const GET_POST = 'post/GET_POST'
const GET_LIKES = 'post/likes/GET_LIKE'

const ADD_POST = 'post/ADD_POST'
const ADD_LIKE = 'post/likes/ADD_LIKE';
const ADD_COMMENT = 'post/CREATE_POST'

const DELETE_LIKE = 'post/likes/DELETE_LIKE';

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

export const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

export const deleteLike = (like) => {
    return {
        type: DELETE_LIKE,
        like
    }
}

// CRUD FEATRURE WITH REDUX
// GET
export const getLikesByUser = (payload) => async(dispatch) => {
    const response = await fetch(`/api/users/${payload.id}/likes`);

    if (response.ok){
        const likes = await response.json();

        dispatch(getLikes(likes));
        // dispatch(getUserLikes(likes.likes))
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

// CREATE
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

export const likeAPost = (payload) => async(dispatch) => {

    const response = await fetch(`/api/posts/${payload.id}/likes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload })
    })
    if(response.ok) {
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

// DELETE
export const deleteALike = (payload) => async(dispatch) => {
    const response = await fetch(`/api/posts/${payload.id}/likes/delete`,
    {
        method: 'DELETE'
    })
    if (response.ok){

        dispatch(deleteLike(payload));
        // dispatch(deleteUserLike(payload))
        const data = await response.json()

        return response
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
            for (let post of action.posts['posts']){
                allPosts.push(post)
            }
            return { ...state, 'posts': allPosts}
        case ADD_COMMENT:
            const newObj = { ...state }
            for (let obj of newObj.posts){
                if (obj.id ===  action.comment.post_id) {
                    obj.comments.push(action.comment)
                    return newObj
                }
            }
            return newObj
        case GET_LIKES:
            const allLikes = action.likes['likes'];
            return { ...state, 'likes': allLikes }
        case ADD_LIKE:
            newState = { ...state }
            for(let post of newState.posts) {
                if(post.id === action.like.post_id){
                    post.likes = [...post.likes, action.like]

                    return newState
                }
            }
            return newState
        case DELETE_LIKE:
            newState = { ...state }
            for(let post of newState.posts) {
                if(post.id === action.like.id) {
                    post.likes = post.likes.filter((p) => p.post_id !== action.like.id)
                    return newState
                }
            }
            return newState
        default:
            return state
    }
}

export default postReducer;
