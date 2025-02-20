"use client";

import { useEffect, useState } from "react";
import styles from "./Pachiku.module.css";
import { type User } from "@prisma/client";
import { getTimeSince } from "@/utils/getTimeSince";

import HeartIcon from "../LikeCommentShareComponents/HeartIcon";
import CommentIcon from "../LikeCommentShareComponents/CommentIcon";
import ShareIcon from "../LikeCommentShareComponents/ShareIcon";

import { getAuthor } from "@/utils/getAuthor";
import { PachikuWithDetails } from "@/types/pachiku";
import UserImage from "../UserImage/UserImage";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/contexts/UserContext";

type PachikuProps = {
    pachiku: PachikuWithDetails;
};

// This component is the Pachiku that comes in the feed without any comments and is used in PachikuPost as the top part of the Pachiku.
export default function Pachiku({ pachiku }: PachikuProps) {
    const [author, setAuthor] = useState<User | null>(null);
    const [initialHeartState, setInitialHeartState] = useState<boolean | null>(
        null
    );
    const { data: session } = useSession();
    const { user: currentUser } = useUserContext();

    // Authorization
    useEffect(() => {
        // If the user signs out, we want the heart state to revert back to false
        // This does that
        if (!session || !session.user) {
            setInitialHeartState(false);
        }
    }, [session]);

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

    useEffect(() => {
        if (author && currentUser) {
            getUserLikesPachiku(currentUser.id, pachiku.id).then((data) => {
                setInitialHeartState(data);
            });
        }
    }, [author, pachiku, currentUser]);

    const timeSince = getTimeSince(pachiku.createdAt);

    if (!author) return null;
    const imageLink = author.image || "/icons/no-image-icon.svg";

    return (
        <li className={styles.pachiku} key={pachiku.id}>
            {/* Body of the pachiku, name, username, time and the pachiku itself */}
            <section className={styles.body}>
                <div className={styles.userInfoContainer}>
                    <UserImage
                        src={imageLink}
                        userFirstName={author.firstName}
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
        </li>
    );
}
