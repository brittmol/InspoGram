const LOAD_POSTS = 'userPosts/GET_POSTS'

const loadPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    }
}


export const getUserPosts = (id) => async(dispatch) => {
    console.log(' *****************************')

    const response = await fetch(`/api/users/${id}/posts`)
    console.log(response, 'response *****************************')

    if (response.ok) {
        const data = await response.json()
        console.log(data, "****************data******************")
        console.log(data.posts, "****************data******************")
        dispatch(loadPosts(data.posts))
    }
    // add a message for no posts found
}

const userPostsReducer = (state={}, action) => {
    let newState = {}
    switch(action.type) {
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
