// import React, { useEffect, useState } from "react"; 
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllPost } from '../../store/post';


// import { Link } from "react-router-dom";
// import "./DisplayComment.css"
// import CommentForm from "./AddComment";


// function DisplayComment(id) { //function DisplayComment(comments) {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);
//     const posts = useSelector(state => state.post.posts);
//     let post = posts.filter(e => e.id == id.id);

//     const [commentCount, setCommentCount] = useState(0);

//     useEffect(() => {
//         setCommentCount(post[0]?.comments.length)
//     },[]);

//     useEffect(() => {
//         const payload = {
//             id: sessionUser.id
//         }
//         dispatch(getAllPost(payload));
//     }, [dispatch, sessionUser]);


//     console.log(commentCount)

//     return (
//         <>
//         <div className="single-comment">
//             {/* {console.log(comments.comments[comments.comments.length - 1])}   */}

//             {/* {comments.comments.length > 1 ?
//                 <>
//                     <Link className="all-comments" to="#">View all {comments.comments.length} comments</Link>
//                     <div className="user-comments">
//                         <Link to={`/api/users/${comments.comments[comments.comments.length - 1]?.user.id}`}>
//                             {comments.comments[comments.comments.length - 1]?.user.username}
//                         </Link>
//                             <div className="caption">{comments.comments[comments.comments.length - 1].comment}</div>
//                     </div>
//                 </> :
//                 <div><Link to={`/api/users/${comments.comments[0]?.user.id}`}>{comments.comments[0]?.user.username}  </Link> {comments.comments[0]?.comment}</div>
//             } */}
//         </div>
//         <CommentForm/>
//         </>
//     )
// }


// export default DisplayComment;
