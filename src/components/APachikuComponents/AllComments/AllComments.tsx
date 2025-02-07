import { Comment } from "@prisma/client";

type AllCommentsProps = {
    allComments: Comment[];
};

export default function AllComments({ allComments }: AllCommentsProps) {
    if (allComments.length === 0) {
        return <h2>No Comments Yet</h2>;
    }

    return (
        <ul>
            {allComments.length > 0 &&
                allComments.map((comment: Comment) => {
                    return <li key={comment.id}>{comment.comment}</li>;
                })}
        </ul>
    );
}
