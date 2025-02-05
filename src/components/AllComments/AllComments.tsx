import { Comment } from "@prisma/client";

type AllCommentsProps = {
    allComments: Comment[];
};

export default function AllComments({ allComments }: AllCommentsProps) {
    return (
        <ul>
            {allComments.length > 0 &&
                allComments.map((comment: Comment) => {
                    return <li key={comment.id}>{comment.comment}</li>;
                })}
        </ul>
    );
}
