"use client";

import { useEffect, useState } from "react";
import styles from "./Pachiku.module.css";
import Image from "next/image";
import { type User } from "@prisma/client";
import { getTimeSince } from "@/utils/getTimeSince";
import {
    HeartIcon,
    CommentIcon,
    ShareIcon,
} from "@/components/APachikuComponents/LikeCommentShareComponents/LikeCommentShareComponents";
import Link from "next/link";
import { getAuthor } from "@/utils/getAuthor";
import { PachikuWithDetails } from "@/types/pachiku";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";

type PachikuProps = {
    pachiku: PachikuWithDetails;
    currentUser: User | null;
};

export default function Pachiku({ pachiku, currentUser }: PachikuProps) {
    const [author, setAuthor] = useState<User | null>(null);
    const [userLikesThisPachiku, setUserLikesThisPachiku] = useState(false);

    useEffect(() => {
        if (!currentUser) return; // Guard clause for when currentUser is null

        let isMounted = false;
        isMounted = true;

        getAuthor(pachiku).then((authorData) => {
            if (isMounted) setAuthor(authorData);
        });

        getUserLikesPachiku(currentUser.id, pachiku.id).then((like) => {
            if (isMounted) setUserLikesThisPachiku(!!like);
        });

        return () => {
            isMounted = false;
        };
    }, [pachiku, currentUser]);

    if (!author || !currentUser) return null; // Return null if author or currentUser is not available

    const timeSince = getTimeSince(pachiku.createdAt);
    const imageLink = author.image || "/icons/no-image-icon.svg";

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
