import { React, useEffect } from "react"; //, useState
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../../store/post';
import SinglePost from "../Post/CreatePost/SinglePost";

function FeedPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const postObject = useSelector(state => state.post);
    const posts = Object.values(postObject)

    useEffect(() => {
        const payload = {
            id: sessionUser.id
        }

        dispatch(getAllPost(payload));
    }, [dispatch])

    if (!posts) return null;

    return (
        <>

            {posts[0]?.map((post) => {
                return <SinglePost key={post.id} post={post} />
            })}

        </>
    )
}


export default FeedPage;
