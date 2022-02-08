// constants
const ADD_POST = 'post/ADD_POST'
const GET_POST = 'post/GET_POST'

const addPost = (post) => ({
    type: ADD_POST,
    post
})

const getPost = (posts) => ({
    type: GET_POST,
    posts
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

export const getAllPost = () => async(dispatch) => {
    const response = await fetch('/api/posts');
    console.log(response)
    if (response.ok){
        const posts = await response.json();
        dispatch(getPost(posts));
    };
}


const postReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case ADD_POST:
            newState = {...state, [action.post.id]: action.post}
            return newState
        case GET_POST:
            const allPosts = []
            console.log("action.post", action.posts)
            for (let [k,post] of Object.entries(action.posts)){
                console.log(k,post)
                allPosts.push(post)
            }
            // action.posts.post.forEach(post => {
            //     allPosts.push(post)
            // });
            // console.log({ ...state, allPosts})
            console.log({ ...state, "allPost": allPosts})
            return { ...state, "allPost": allPosts}
        default:
            return state
    }
}

export default postReducer;
