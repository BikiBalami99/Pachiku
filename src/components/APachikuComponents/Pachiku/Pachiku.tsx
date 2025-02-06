import styles from "./Pachiku.module.css";
import Image from "next/image";
import { type User, Comment, Pachiku as PachikuType } from "@prisma/client";
import { getTimeSince } from "@/utils/getTimeSince";
import {
    CommentIcon,
    HeartIcon,
    ShareIcon,
} from "@/components/APachikuComponents/LikeCommentShareComponents/LikeCommentShareComponents";
import { prisma } from "@/lib/prisma";
// import AllComments from "../AllComments/AllComments";

type PachikuProps = {
    user: User;
    pachiku: PachikuType & { comments: Comment[] }; // Ensure comments are included
};

export default async function Pachiku({ user, pachiku }: PachikuProps) {
    const timeSince = getTimeSince(pachiku.createdAt);

    const imageLink = user.avatar ? user.avatar : "/icons/no-avatar-icon.svg";

    const userHeartPachikuCheck = await prisma.like.findUnique({
        where: { userId_pachikuId: { userId: user.id, pachikuId: pachiku.id } },
    });

    let userLikesThisPachiku: boolean;
    if (userHeartPachikuCheck) {
        userLikesThisPachiku = true;
    } else {
        userLikesThisPachiku = false;
    }

    return (
        <li className={styles.pachiku} key={pachiku.id}>
            <section className={styles.body}>
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
            </section>

            <section className={styles.likesCommentsShare}>
                <div className={styles.likes}>
                    <HeartIcon
                        pachikuId={pachiku.id}
                        initialHeartState={userLikesThisPachiku}
                        initialNumOfLikes={pachiku.likes}
                    />
                </div>
                <div>
                    <CommentIcon />
                    {pachiku.comments.length}
                </div>
                <div>
                    <ShareIcon />
                    Share
                </div>
            </section>
        </li>
    );
}
