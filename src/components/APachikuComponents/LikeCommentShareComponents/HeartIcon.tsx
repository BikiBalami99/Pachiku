"use client";

import { useEffect, useState } from "react";
import styles from "./LikeCommentShareComponents.module.css";

interface HeartIconProps {
    pachikuId: string;
    initialHeartState: boolean;
    initialNumOfLikes: number;
}

export default function HeartIcon({
    pachikuId,
    initialHeartState,
    initialNumOfLikes,
}: HeartIconProps) {
    const [heartClicked, setHeartClicked] = useState(initialHeartState);
    const [numOfLikes, setNumOfLikes] = useState(initialNumOfLikes);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Class name that shows whether we hearted the pachiku or not
    const [heartClassName, setHeartClassName] = useState(
        initialHeartState
            ? `${styles.heartIcon} ${styles.heartIconClicked}`
            : `${styles.heartIcon}`
    );

    // Handle click with debounce and error handling
    const handleClick = async () => {
        if (isSubmitting) return; // Prevent double-taps
        setIsSubmitting(true);

        // Optimistic update

        //In case we need to revert to these values
        const oldHeartState = heartClicked;
        const oldNumLikes = numOfLikes;

        // Optimistically setting the new states before we try hitting the server
        const newHeartState = !heartClicked;
        const expectedLikes = newHeartState ? numOfLikes + 1 : numOfLikes - 1;
        setHeartClicked(newHeartState);
        setNumOfLikes(expectedLikes);

        try {
            const likeRes = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pachikuId, like: newHeartState }),
                cache: "no-store",
            });

            if (!likeRes.ok) throw new Error("Request failed");

            const likeData = await likeRes.json();
            if (likeData.error) throw new Error(likeData.error);

            // Update with server's actual count, optimistically nothing will change because of the optimistic state
            setNumOfLikes(likeData.newLikesCount);
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on error
            setHeartClicked(oldHeartState);
            setNumOfLikes(oldNumLikes);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Dynamic heart icon class
    useEffect(() => {
        if (heartClicked) {
            setHeartClassName(`${styles.heartIcon} ${styles.heartIconClicked}`);
        } else {
            setHeartClassName(`${styles.heartIcon}`);
        }
    }, [heartClicked]);

    return (
        <div className={styles.container}>
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

            <span className={styles.span}>{numOfLikes}</span>
        </div>
    );
}
