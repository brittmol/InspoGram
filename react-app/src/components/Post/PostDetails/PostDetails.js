import { useSelector } from "react-redux";
function PostDetails({postId}) {
    const post = useSelector(state => state.userPostsReducer.postId)

    return (
        <div>
            in modal {postId}
        </div>
    )
}

export default PostDetails;
