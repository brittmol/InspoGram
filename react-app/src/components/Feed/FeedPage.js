import { React, useEffect } from "react"; //, useState
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../../store/post';
import SinglePost from "../Post/CreatePost/SinglePost";


function FeedPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);
    

    useEffect(() => {
        const payload = {
            id: sessionUser.id
        }

        dispatch(getAllPost(payload));
    }, [dispatch])

    if (!posts) return null;

    return (
        <>
            {posts?.map((post) => {
                return <SinglePost key={post.id} post={post}/>
            })}

        </>
    )
}


export default FeedPage;
