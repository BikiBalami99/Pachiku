"use server";

import { Comment, Pachiku as PachikuType } from "@prisma/client";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { deleteComment } from "@/app/actions";

type AllCommentsProps = {
    allComments: Comment[];
    pachiku: PachikuType & { comments: Comment[] };
};

export default async function AllComments({
    allComments,
    pachiku,
}: AllCommentsProps) {
    const session = await getServerSession();
    return (
        <section>
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

                        // Showing the delete button only if the user logged in commented this comment
                        const isTheUserTheCommenter =
                            commentedBy?.email === session?.user.email;

                        return (
                            <li key={comment.id}>
                                <h4>
                                    Commented by:
                                    {commentedBy ? commentedBy.firstName : ""}
                                </h4>
                                {comment.comment}
                                {isTheUserTheCommenter && (
                                    <form action={deleteComment}>
                                        <input
                                            type="hidden"
                                            name="pachikuId"
                                            value={pachiku.id}
                                        />
                                        <input
                                            type="hidden"
                                            name="commentId"
                                            id="commentId"
                                            value={comment.id}
                                        />
                                        <button>Delete</button>
                                    </form>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
            <NewCommentForm pachiku={pachiku} />
        </section>
    );
}
