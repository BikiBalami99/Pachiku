"use server";

import { Comment } from "@prisma/client";
import NewCommentForm from "../NewCommentForm/NewCommentForm";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import styles from "./AllComments.module.css";
import CommentComponent from "../Comment/CommentComponent";
import { PachikuWithDetails } from "@/types/pachiku";

type AllCommentsProps = {
    allComments: Comment[];
    pachiku: PachikuWithDetails;
};

export default async function AllComments({
    allComments,
    pachiku,
}: AllCommentsProps) {
    const session = await getServerSession();

    return (
        <section className={styles.allComments}>
            <h3>All Comments</h3>
            {allComments.length === 0 ? (
                <h2>No Comments Yet</h2>
            ) : (
                <ul className={styles.allCommentsUL}>
                    {allComments.map(async (comment: Comment) => {
                        // Finding the commenter of this comment
                        const commentedBy = await prisma.user.findUnique({
                            where: {
                                id: comment.userId,
                            },
                        });

                        if (!commentedBy)
                            throw new Error(
                                "Could not find author of the comment"
                            );

                        // Showing the delete button only if the user logged in commented this comment using this boolean
                        const isTheUserTheCommenter =
                            commentedBy.email === session?.user.email;

                        return (
                            <CommentComponent
                                key={comment.id}
                                comment={comment}
                                commentedBy={commentedBy}
                                isTheUserTheCommenter={isTheUserTheCommenter}
                                pachiku={pachiku}
                            />
                        );
                    })}
                </ul>
            )}
            {session && <NewCommentForm pachiku={pachiku} />}
        </section>
    );
}
