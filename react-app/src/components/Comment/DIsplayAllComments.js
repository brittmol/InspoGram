import CommentModal from ".";


function DisplayAllComments({comments}) {

    return (
        <>
            {comments.map(comment => (
                <div key={comment.id}>{comment.comment}
                    <CommentModal comment={comment} />
                </div>

            ))}
        </>
    )
}

export default DisplayAllComments;
