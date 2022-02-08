import { useSelector } from "react-redux";
function PostDetails({post}) {
    const singlePost = useSelector(state => state.userPostsReducer[post.id])

    return (
        <div>
            in modal {post.id}
        </div>
    )
}

export default PostDetails;
