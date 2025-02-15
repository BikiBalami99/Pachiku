import styles from "./Pachiku.module.css";
import Image from "next/image";
import { type User } from "@prisma/client";
import { getTimeSince } from "@/utils/getTimeSince";
import {
    HeartIcon,
    CommentIcon,
    ShareIcon,
} from "@/components/APachikuComponents/LikeCommentShareComponents/LikeCommentShareComponents";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getAuthor } from "@/utils/getAuthor";
import { PachikuWithDetails } from "@/types/pachiku";

type PachikuProps = {
    pachiku: PachikuWithDetails;
    currentUser: User;
};

export default async function Pachiku({ pachiku, currentUser }: PachikuProps) {
    // author is the author of the post while currentUser is the user who is signed in
    const author = await getAuthor(pachiku);
    if (!author) {
        console.error("Author not found");
        return null;
    }

    const timeSince = getTimeSince(pachiku.createdAt);
    const imageLink = author.image || "/icons/no-image-icon.svg";

    // Checks if the current user likes this post or not
    const userHeartPachikuCheck = await prisma.like.findUnique({
        where: {
            userId_pachikuId: { userId: currentUser.id, pachikuId: pachiku.id },
        },
    });
    const userLikesThisPachiku = !!userHeartPachikuCheck;

    return (
        <li className={styles.pachiku} key={pachiku.id}>
            <section className={styles.body}>
                <Image
                    src={imageLink}
                    width={48}
                    height={48}
                    alt={`${author.firstName}'s avatar`}
                    className={styles.image}
                />
                <div>
                    <div className={styles.userInfoContainer}>
                        <h3>
                            {author.firstName} {author.lastName}
                        </h3>
                        <h4>@{author.username}</h4>
                        <p>・</p>
                        <p>{timeSince} ago</p>
                    </div>
                    <p>{pachiku.pachiku}</p>
                </div>
            </section>

            <section className={styles.likesCommentsShare}>
                <HeartIcon
                    pachikuId={pachiku.id}
                    initialHeartState={userLikesThisPachiku}
                    initialNumOfLikes={pachiku.likes}
                />
                <div>
                    <CommentIcon allComments={pachiku.comments} />
                </div>
                <div>
                    <ShareIcon />
                    Share
                </div>
                <Link href={`/pachiku-page/${pachiku.id}`}>
                    View this pachiku
                </Link>
            </section>
        </li>
    );
}
