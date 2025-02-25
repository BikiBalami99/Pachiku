"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LikeCommentShareComponents.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getLikedBy } from "@/utils/getLikedBy";
import { User } from "@prisma/client";
import Image from "next/image";

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
    const [authorized, setAuthorized] = useState(false);
    const [likedBy, setLikedBy] = useState<User[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(isDialogOpen);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { data: session } = useSession();
    const router = useRouter();

    // Getting likedBy array
    useEffect(() => {
        getLikedBy(pachikuId)
            .then((data) => {
                setLikedBy(data);
            })
            .catch((error) => console.log(error));
    }, [pachikuId]);

    // Authorization
    useEffect(() => {
        if (!session || !session.user) {
            setAuthorized(false);
        }
        if (session && session.user) {
            setAuthorized(true);
        }
    }, [session]);

    // Handle click with debounce and error handling
    const handleClick = async () => {
        if (!authorized) {
            router.push("/api/auth/signin");
            return;
        }
        if (isSubmitting) return; // Prevent double-taps
        setIsSubmitting(true);

        // Optimistic update

        // In case we need to revert to these values
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

            // Refreshing the likedBy data
            getLikedBy(pachikuId)
                .then((data) => {
                    setLikedBy(data);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on error
            setHeartClicked(oldHeartState);
            setNumOfLikes(oldNumLikes);
        } finally {
            setIsSubmitting(false);
        }
    };

    function openModal() {
        dialogRef.current?.show();
        setIsDialogOpen(true);
    }

    function closeModal() {
        dialogRef.current?.close();
        setIsDialogOpen(false);
    }

    return (
        <div className={styles.container}>
            <svg
                width="25"
                height="23"
                viewBox="0 0 25 23"
                className={styles.heartIcon}
                onClick={handleClick}
                aria-label={heartClicked ? "Unlike post" : "Like post"}
                data-clicked={heartClicked}
                data-authorized={authorized}
            >
                <path d="M12.5 4C11.5 2 9.18367 0.992195 7.47013 1.00007C5.75659 1.00794 4.11548 1.69214 2.90381 2.90381C1.69214 4.11548 1.00794 5.75659 1.00007 7.47013C0.992195 9.18368 1.66128 10.831 2.86176 12.0538L3.21576 12.4078L12.4078 21.5998L21.5998 12.4078L21.9538 12.0538C23.1447 10.8291 23.8057 9.18484 23.7937 7.47662C23.7818 5.76841 23.0978 4.13357 21.8898 2.92571C20.6818 1.71786 19.0469 1.03409 17.3387 1.02231C15.6305 1.01053 13.5 2 12.5 4Z" />
            </svg>
            <span onClick={openModal} className={styles.span}>
                {numOfLikes}
            </span>
            <dialog
                ref={dialogRef}
                className={styles.likedBy}
                data-open={isDialogOpen}
            >
                <h3>Hearted by</h3>
                {likedBy.length > 0 ? (
                    <ul className={styles.listOfLikers}>
                        {likedBy.map((user) => (
                            <li key={user.id} className={styles.liker}>
                                <Image
                                    src={user.image}
                                    width={16}
                                    height={16}
                                    alt="image of liker"
                                />
                                {user.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    "None yet.."
                )}

                <button className={styles.icon} onClick={closeModal}>
                    &times;
                </button>
            </dialog>
        </div>
    );
}
