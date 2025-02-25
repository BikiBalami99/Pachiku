import { PachikuWithDetails } from "@/types/pachiku";
import { type Comment, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./CommentComponent.module.css";
import { getTimeSince } from "@/utils/getTimeSince";
import { deleteComment } from "../commentActions/commentActions";

export default function CommentComponent({
    comment,
    commentedBy,
    pachiku,
    isTheUserTheCommenter,
}: {
    comment: Comment;
    commentedBy: User;
    pachiku: PachikuWithDetails;
    isTheUserTheCommenter: boolean;
}) {
    return (
        <li className={styles.comment} key={comment.id}>
            <div className={styles.commenter}>
                <Image
                    src={commentedBy.image}
                    height={54}
                    width={54}
                    alt="Commenter's image"
                    className={styles.commenterImage}
                />
                <div className={styles.commenterInfo}>
                    <h3>
                        {commentedBy.firstName} {commentedBy.lastName}
                    </h3>
                    <p>@{commentedBy.username}</p>
                    <p>{getTimeSince(comment.createdAt)}</p>
                </div>
            </div>

            <div className={styles.commentText}>
                {comment.comment}
                {/* Delete comment button */}
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
                        <button className={styles.deleteButton}>&times;</button>
                    </form>
                )}
            </div>
        </li>
    );
}
