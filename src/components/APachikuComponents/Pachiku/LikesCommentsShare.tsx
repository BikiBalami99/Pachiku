import HeartIcon from "../LikeCommentShareComponents/HeartIcon";
import CommentIcon from "../LikeCommentShareComponents/CommentIcon";
import ShareIcon from "../LikeCommentShareComponents/ShareIcon";
import { type PachikuWithDetails } from "@/types/pachiku";
import styles from "./Pachiku.module.css";

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
