const SinglePost = (post) => {
    return (
        <div>
            {console.log(post)}
            {console.log(post['post'].Comment)}
            <h2>Hello</h2>
            <h2>{post['post'].id}</h2>
            <h2>{post['post'].caption}</h2>
            {(post['post'].Comment).map( (comment) => {
                return <h2>{comment.comment}</h2>
            })}
        </div>
    )
}

export default SinglePost
