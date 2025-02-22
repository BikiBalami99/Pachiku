"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/contexts/UserContext";
import { getTimeSince } from "@/utils/getTimeSince";
import { getAuthor } from "@/utils/getAuthor";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { type User } from "@prisma/client";
import { type PachikuWithDetails } from "@/types/pachiku";
import HeartIcon from "../LikeCommentShareComponents/HeartIcon";
import CommentIcon from "../LikeCommentShareComponents/CommentIcon";
import ShareIcon from "../LikeCommentShareComponents/ShareIcon";
import UserImage from "../UserImage/UserImage";
import styles from "./Pachiku.module.css";
import ThreeDotsMenu from "@/components/UtilityComponents/ThreeDotsMenu/ThreeDotsMenu";
import { usePachikuContext } from "@/contexts/PachikuContext";

// Props type definition
type PachikuProps = {
    pachiku: PachikuWithDetails;
};

// Pachiku Component
// This component represents a single Pachiku post in the feed without any comments.
// It is used in PachikuPost as the top part of the Pachiku.
export default function Pachiku({ pachiku }: PachikuProps) {
    // State to store the author information
    const [author, setAuthor] = useState<User | null>(null);

    // State to store the initial heart (like) state
    const [initialHeartState, setInitialHeartState] = useState<boolean | null>(
        null
    );

    // States for editing the pachiku
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [editedPachiku, setEditedPachiku] = useState(pachiku.pachiku);

    // Get the current session and user context
    const { data: session } = useSession();
    const { user: currentUser } = useUserContext();
    const { refreshPachikuData } = usePachikuContext();

    // Authorization: If the user signs out, revert the heart state to false
    useEffect(() => {
        if (!session || !session.user) {
            setInitialHeartState(false);
        }
    }, [session]);

    // Fetch the author information
    useEffect(() => {
        let isMounted = true;
        getAuthor(pachiku).then((authorData) => {
            if (isMounted) setAuthor(authorData);
        });

        return () => {
            isMounted = false;
        };
    }, [pachiku]);

    // Fetch the initial heart (like) state
    useEffect(() => {
        if (author && currentUser) {
            getUserLikesPachiku(currentUser.id, pachiku.id).then((data) => {
                setInitialHeartState(data);
            });
        }
    }, [author, pachiku, currentUser]);

    // Calculate the time since the Pachiku was created
    const timeSince = getTimeSince(pachiku.createdAt);

    if (!author) return null;

    const imageLink = author.image || "/icons/no-image-icon.svg";

    async function updatePachiku(formData: FormData) {
        if (
            !(formData instanceof FormData) ||
            !formData.has("pachikuId") ||
            !formData.has("editedPachikuText")
        ) {
            throw new Error("Invalid input");
        }

        if (
            !session ||
            !session.user ||
            !currentUser ||
            !author ||
            currentUser.id !== author.id
        ) {
            throw new Error("Unauthorized action");
        }

        const pachikuId = formData.get("pachikuId");
        const editedPachikuText = formData.get("editedPachikuText");

        if (!pachikuId || !editedPachikuText) {
            throw new Error("Invalid input");
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/pachiku`,
                {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        pachikuId: pachikuId.toString(),
                        editedPachikuText: editedPachikuText.toString(),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update Pachiku");
            }

            const data = await response.json();
            console.log("Pachiku updated successfully:", data);
        } catch (error) {
            console.error("Error updating Pachiku:", error);
        } finally {
            setEditFormVisible(false);
            refreshPachikuData();
        }
    }
    function deletePachiku() {}

    return (
        <li className={styles.pachiku} key={pachiku.id}>
            {/* Body of the Pachiku: name, username, time, and the Pachiku text */}
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

                    <div className={styles.threeDotsMenuContainer}>
                        {/* We need the container for positioning */}
                        <ThreeDotsMenu
                            actionForEdit={() => setEditFormVisible(true)}
                            actionForDelete={deletePachiku}
                        />
                    </div>
                </div>

                {editFormVisible ? (
                    <form
                        action={updatePachiku}
                        className={styles.editPachikuForm}
                    >
                        <input
                            className={styles.editPachikuInput}
                            type="text"
                            name="editedPachikuText"
                            value={editedPachiku}
                            onChange={(e) => setEditedPachiku(e.target.value)}
                        />
                        <input
                            type="hidden"
                            name="pachikuId"
                            value={pachiku.id}
                        />
                        <div className={styles.editPachikuButtons}>
                            <button
                                type="submit"
                                className="button primaryButton"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setEditFormVisible(false)}
                                className="button whiteButton"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className={styles.pachikuText}>{pachiku.pachiku}</p>
                )}
            </section>

            {/* Likes, comments, and share section */}
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
