"use client";

import styles from "./LikeCommentShareComponents.module.css";
import { Comment } from "@prisma/client";
import Link from "next/link";

// CommentIcon section

interface CommentIconProps {
    allComments: Comment[] | undefined;
    pachikuId: string;
}

export default function CommentIcon({
    allComments,
    pachikuId,
}: CommentIconProps) {
    const commentCount = Array.isArray(allComments) ? allComments.length : 0;

    return (
        <Link className={styles.container} href={`/pachiku-page/${pachikuId}`}>
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.commentIcon}
                role="img"
                aria-label="Comment Icon"
            >
                <path d="M1 10.8182C1 16.2406 5.31725 20.6364 10.6429 20.6364C11.7699 20.6364 12.8518 20.4395 13.8571 20.0777C17.0714 19.9091 20.2857 20.6364 21 21C21 20.2727 19.5714 17.5909 18.5 16.5C19.3333 15.6515 20.2857 13.1455 20.2857 10.8182C20.2857 5.39575 15.9685 1 10.6429 1C5.31725 1 1 5.39575 1 10.8182Z" />
            </svg>
            <span className={styles.span}>{commentCount}</span>
        </Link>
    );
}
