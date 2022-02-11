import { addLike, deleteLike } from "./post";

const LOAD_POSTS = 'userPosts/GET_POSTS';
const ADD_USER_POST = 'userPosts/ADD_USER_POSTS';
const EDIT_USER_POST = 'userPosts/EDIT_USER_POSTS';
const DELETE_USER_POST = 'userPosts/DELETE_USER_POSTS';
const ADD_USER_COMMENT = 'userPost/CREATE_POST'
const UPDATE_USER_COMMENT = 'userPost/UPDATE_USER_COMMENT'
const DELETE_USER_COMMENT = 'userPost/DELETE_USER_COMMENT'
const ADD_USER_LIKE = 'userPost/ADD_USER_LIKE'
const GET_USER_LIKES = 'userPost/GET_USER_LIKES'
const DELETE_USER_LIKE = 'userPost/DELETE_USER_LIKE'



export const getLikes = (likes) => {
    return {
        type: GET_USER_LIKES,
        likes
    }
}

export const addLikeToUser = (like) => {
    return {
        type: ADD_USER_LIKE,
        like
    }
}

export const deleteLikeFromUser = (like) => {
    return {
        type: DELETE_USER_LIKE,
        like
    }
}

export const loadPosts = (posts) => {
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

const removeUserComment = (id) => {
    return {
        type: DELETE_USER_COMMENT,
        id
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE_USER_COMMENT,
        comment
    }
}

// export const getUserLikes = (postId) => async(dispatch) => {
//     const response = await fetch(`/api/users/${payload.id}/likes`)
// }

export const addUserLike = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts/${payload.id}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload })
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addLikeToUser(data))
        // dispatch(addLike(data))
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

export const deleteUserLike = (payload) => async (dispatch) => {
    const response = await fetch(`/api/posts/${payload.id}/likes/delete`,
        {
            method: 'DELETE'
        })
    if (response.ok) {

        // dispatch(deleteLike(payload));
        dispatch(deleteLikeFromUser(payload))
        const data = await response.json()

        return response
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

export const deleteUserComment = (id) => async (dispatch) => {

    const response = await fetch(`/api/comments/${id}/delete`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
    const data = await response.json()
    if (data.message === 'Deleted') {

        dispatch(removeUserComment(id))
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
        case ADD_USER_LIKE:
            newState = { ...state }
            for (let post in newState) {

                if (newState[post].id === action.like.post_id) {

                    newState[post].likes = [...newState[post].likes, action.like]


                    return newState
                }
            }
            return newState
        case DELETE_USER_LIKE:
            newState = { ...state }
            // for(let post in newState) {
                // if(newState[post].id === action.like.id) {
                //     console.log(newState[post].likes, 'in the delete pre filter')
                //     console.log(action.like, action.like.id, 'action like')
                //     newState[post].likes = newState[post].likes.filter((p) => p.post_id !== action.like.id)
                //     console.log(newState[post].likes, 'in the delete post filter')

                //     return newState
                // }

            // }
            // return newState
            for (let post in newState) {
                newState[post].likes.forEach(like => {
                    if (like.post_id === Number(action.like.id)) {
                        like = 1
                        let index = newState[post].likes.indexOf(1)
                        newState[post].likes.splice(index, 1)

                        return newState
                    }
                })
            }
            return newState
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
            for (let post in newState) {


                if (newState[post].id === action.comment.post_id) {
                    newState[post].comments.push(action.comment)
                    return newState
                }
            }
            return newState
        case UPDATE_USER_COMMENT:
            newState = { ...state }
            for (let post in newState) {
                if (newState[post].id === action.comment.post_id) {
                    newState[post].comments.forEach(comment => {
                        if (comment.id === action.comment.id) {
                            comment.comment = action.comment.comment
                        }
                    })
                    return newState
                }
            }
            return newState
        case DELETE_USER_COMMENT:
            newState = { ...state }
            for (let post in newState) {
                newState[post].comments.forEach(comment => {
                    if (comment.id === Number(action.id)) {
                        comment = 1
                        let index = newState[post].comments.indexOf(1)
                        newState[post].comments.splice(index, 1)
                        return newState
                    }
                })
            }
            return newState
        default:
            return state
    }
}

export default userPostsReducer;
