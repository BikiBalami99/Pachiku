import { type User, Comment, Pachiku as PachikuType } from "@prisma/client";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import { prisma } from "@/lib/prisma";

type AllCommentsProps = {
    allComments: Comment[];
    user: User;
    pachiku: PachikuType & { comments: Comment[] };
};

export default function AllComments({
    allComments,
    user,
    pachiku,
}: AllCommentsProps) {
    return (
        <section>
            <NewCommentForm user={user} pachiku={pachiku} />

            {allComments.length === 0 ? (
                <h2>No Comments Yet</h2>
            ) : (
                <ul>
                    {allComments.map(async (comment: Comment) => {
                        const commentedBy = await prisma.user.findUnique({
                            where: {
                                id: comment.userId,
                            },
                        });

                        return (
                            <li key={comment.id}>
                                <h4>
                                    Commented by:
                                    {commentedBy ? commentedBy.firstName : ""}
                                </h4>
                                {comment.comment}
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
