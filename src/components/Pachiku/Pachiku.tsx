import styles from "./Pachiku.module.css";
import Image from "next/image";
import { type User, Comment, Pachiku as PachikuType } from "@prisma/client";
import { getTimeSince } from "@/utils/getTimeSince";
import {
    CommentIcon,
    HeartIcon,
    ShareIcon,
} from "@/assets/IconsAsComponents/LikeCommentShareIcons";
// import AllComments from "../AllComments/AllComments";

type PachikuProps = {
    user: User;
    pachiku: PachikuType & { comments: Comment[] }; // Ensure comments are included
};

export default function Pachiku({ user, pachiku }: PachikuProps) {
    const timeSince = getTimeSince(pachiku.createdAt);

    const imageLink = user.avatar ? user.avatar : "/icons/no-avatar-icon.svg";
    // const allComments: Comment[] = pachiku.comments;

    return (
        <li className={styles.pachiku} key={pachiku.id}>
            <div className={styles.body}>
                <div className={styles.avatarContainer}>
                    <Image
                        src={imageLink}
                        width={48}
                        height={48}
                        alt={`${user.firstName}'s avatar image`}
                    />
                </div>
                <div>
                    <div className={styles.userInfoContainer}>
                        <h3>
                            {user.firstName} {user.lastName}
                        </h3>
                        <h4>@{user.username}</h4>
                        <p>・</p>
                        <p>{timeSince} ago</p>
                    </div>
                    {pachiku.pachiku}
                </div>
            </div>

            <div className={styles.likesCommentsShare}>
                <div className={styles.likes}>
                    <HeartIcon />
                    {pachiku.likes}
                </div>
                <div>
                    <CommentIcon />
                    {pachiku.comments.length}
                </div>
                <div>
                    <ShareIcon />
                    Share
                </div>
            </div>
            {/* <AllComments allComments={allComments} /> */}
        </li>
    );
}
