import { React, useEffect } from "react"; //, useState
import { useSelector, useDispatch } from 'react-redux';
import { getAllPost } from '../../store/post';
import SinglePost from "./SinglePost";


function FeedPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => state.post.posts);
    //const posts = useSelector(state => state.post);


    useEffect(() => {
        const payload = {
            id: sessionUser?.id
        }

        dispatch(getAllPost(payload));
    }, [dispatch, sessionUser])

    if (!posts) return null;

    return (
        <>
            {Object.values(posts)?.map((post) => {
                return <SinglePost key={post.id} id={post.id}/>
            })}
        </>
    )
}


export default FeedPage;
