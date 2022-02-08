import { React, useEffect } from "react"; //, useState
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../../store/post';
import SinglePost from "../Post/CreatePost/SinglePost";

function FeedPage() {
    const dispatch = useDispatch();
    const postObject = useSelector(state => state.post);
    const posts = Object.values(postObject)

    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch])

    if (!posts) return null;

    return (
        <>
            {posts[0]?.map((post) => {
                return <SinglePost key={post['Post'].id} post={post['Post']} />
            })}
        </>
    )
}


export default FeedPage;
