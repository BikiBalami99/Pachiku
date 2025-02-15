"use client";

import { useState } from "react";
import styles from "./LikeCommentShareComponents.module.css";
import { Comment } from "@prisma/client";
import Link from "next/link";

interface HeartIconProps {
    pachikuId: string;
    initialHeartState: boolean;
    initialNumOfLikes: number;
}

export function HeartIcon({
    pachikuId,
    initialHeartState,
    initialNumOfLikes,
}: HeartIconProps) {
    const [heartClicked, setHeartClicked] = useState(initialHeartState);
    const [numOfLikes, setNumOfLikes] = useState(initialNumOfLikes);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle click with debounce and error handling
    const handleClick = async () => {
        if (isSubmitting) return; // Prevent double-taps
        setIsSubmitting(true);

        // Optimistic update
        const newHeartState = !heartClicked;
        const expectedLikes = newHeartState ? numOfLikes + 1 : numOfLikes - 1;
        setHeartClicked(newHeartState);
        setNumOfLikes(expectedLikes);

        try {
            const likeRes = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pachikuId }),
                cache: "no-store",
            });

            if (!likeRes.ok) throw new Error("Request failed");

            const likeData = await likeRes.json();
            if (likeData.error) throw new Error(likeData.error);

            // Update with server's actual count
            setNumOfLikes(likeData.newLikesCount);
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on error
            setHeartClicked(initialHeartState);
            setNumOfLikes(initialNumOfLikes);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Dynamic heart icon class
    const heartClassName = `${styles.heartIcon} 
    ${heartClicked ? styles.heartIconClicked : ""} 
    ${isSubmitting ? styles.heartIconDeactivated : ""}`;

    return (
        <div className={styles.likeContainer}>
            <svg
                width="25"
                height="23"
                viewBox="0 0 25 23"
                className={heartClassName}
                onClick={handleClick}
                aria-label={heartClicked ? "Unlike post" : "Like post"}
            >
                <path d="M12.5 4C11.5 2 9.18367 0.992195 7.47013 1.00007C5.75659 1.00794 4.11548 1.69214 2.90381 2.90381C1.69214 4.11548 1.00794 5.75659 1.00007 7.47013C0.992195 9.18368 1.66128 10.831 2.86176 12.0538L3.21576 12.4078L12.4078 21.5998L21.5998 12.4078L21.9538 12.0538C23.1447 10.8291 23.8057 9.18484 23.7937 7.47662C23.7818 5.76841 23.0978 4.13357 21.8898 2.92571C20.6818 1.71786 19.0469 1.03409 17.3387 1.02231C15.6305 1.01053 13.5 2 12.5 4Z" />
            </svg>

            <span className={styles.likeCount}>{numOfLikes}</span>
        </div>
    );
}

// CommentIcon section

interface CommentIconProps {
    allComments: Comment[];
    pachikuId: string;
}

export function CommentIcon({ allComments, pachikuId }: CommentIconProps) {
    return (
        <>
            <Link href={`/pachiku-page/${pachikuId}`}>
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
            </Link>
            {allComments.length}
        </>
    );
}

// Share section

export function ShareIcon() {
    return (
        <svg
            width="25"
            height="23"
            viewBox="0 0 25 23"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.shareIcon}
            role="img"
            aria-label="Share Icon"
        >
            <path d="M1 13V20.1579C1.11616 20.7719 1.62727 22 2.74242 22C3.85758 22 16.2172 22 22.2576 22C22.8384 21.8772 24 21.3368 24 20.1579C24 18.9789 24 16.193 24 13M12.5 17.2105V1M12.5 1L19.1212 6.89474M12.5 1L5.5303 6.89474" />
        </svg>
    );
}
