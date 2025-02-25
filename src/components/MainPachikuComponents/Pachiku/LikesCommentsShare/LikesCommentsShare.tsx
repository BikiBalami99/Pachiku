"use client";

import HeartIcon from "./IconComponents/HeartIcon";
import CommentIcon from "./IconComponents/CommentIcon";
import ShareIcon from "./IconComponents/ShareIcon";
import { type PachikuWithDetails } from "@/types/pachiku";
import styles from "./LikesCommentsShare.module.css";

type LikesCommentsShareProps = {
    initialHeartState: boolean | null;
    pachiku: PachikuWithDetails;
};

export default function LikesCommentsShare({
    initialHeartState,
    pachiku,
}: LikesCommentsShareProps) {
    return (
        <section className={styles.likesCommentsShare}>
            {initialHeartState !== null && (
                <HeartIcon
                    pachikuId={pachiku.id}
                    initialHeartState={initialHeartState}
                    initialNumOfLikes={pachiku.likes}
                />
            )}
            <CommentIcon
                pachikuId={pachiku.id}
                allComments={pachiku.comments}
            />
            <ShareIcon pachikuId={pachiku.id} />
        </section>
    );
}
