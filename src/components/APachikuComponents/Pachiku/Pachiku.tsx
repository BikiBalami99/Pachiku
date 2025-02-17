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
import { getAuthor } from "@/utils/getAuthor";
import { PachikuWithDetails } from "@/types/pachiku";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { useUserContext } from "@/contexts/UserContext";

type PachikuProps = {
    pachiku: PachikuWithDetails;
};

// This component is the Pachiku that comes in the feed without any comments and is used in PachikuPost as the top part of the Pachiku.

export default function Pachiku({ pachiku }: PachikuProps) {
    const [author, setAuthor] = useState<User | null>(null);
    const [userLikesThisPachiku, setUserLikesThisPachiku] = useState(false);
    const { user: currentUser } = useUserContext();

    // Fetch author
    useEffect(() => {
        let isMounted = true;
        getAuthor(pachiku).then((authorData) => {
            if (isMounted) setAuthor(authorData);
        });

        return () => {
            isMounted = false;
        };
    }, [pachiku]);

    // Check if the current user likes this pachiku
    useEffect(() => {
        if (!currentUser) return;

        let isMounted = true;
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
            {/* Body of the pachiku, name, username, time and the pachiku itself */}
            <section className={styles.body}>
                <div className={styles.userInfoContainer}>
                    <Image
                        src={imageLink}
                        width={48}
                        height={48}
                        alt={`${author.firstName}'s avatar`}
                        className={styles.image}
                    />
                    <div className={styles.textInfo}>
                        <h3 className={styles.fullName}>
                            {author.firstName} {author.lastName}
                        </h3>
                        <h4 className={styles.username}>@{author.username}</h4>
                        <p className={styles.timeSince}>{timeSince}</p>
                    </div>
                </div>

                <p className={styles.pachikuText}>{pachiku.pachiku}</p>
            </section>

            {/* Likes comments and share */}
            <section className={styles.likesCommentsShare}>
                <HeartIcon
                    pachikuId={pachiku.id}
                    initialHeartState={userLikesThisPachiku}
                    initialNumOfLikes={pachiku.likes}
                />
                <CommentIcon
                    pachikuId={pachiku.id}
                    allComments={pachiku.comments}
                />
                <ShareIcon pachikuId={pachiku.id} />
            </section>
        </li>
    );
}
