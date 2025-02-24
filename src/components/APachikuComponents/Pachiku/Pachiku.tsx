"use client";

import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserContext } from "@/contexts/UserContext";
import { getTimeSince } from "@/utils/getTimeSince";
import { getAuthor } from "@/utils/getAuthor";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { type User } from "@prisma/client";
import { type PachikuWithDetails } from "@/types/pachiku";
import styles from "./Pachiku.module.css";
import { usePachikuContext } from "@/contexts/PachikuContext";
import UserInfoContainer from "./UserInfoContainer";
import EditPachikuForm from "./EditPachikuForm";
import LikesCommentsShare from "./LikesCommentsShare";
import { updatePachiku } from "./updatePachiku";

// Create a context for Pachiku actions
const PachikuContext = createContext<PachikuWithDetails | null>(null);

type PachikuProps = {
    pachiku: PachikuWithDetails;
}; // Props type definition

// Pachiku Component
export default function Pachiku({ pachiku }: PachikuProps) {
    const [author, setAuthor] = useState<User | null>(null); // State to store the author information
    const [initialHeartState, setInitialHeartState] = useState<boolean | null>(
        null
    ); // State to store the initial heart (like) state
    const [editFormVisible, setEditFormVisible] = useState(false); // States for editing the pachiku
    const [editedPachiku, setEditedPachiku] = useState(pachiku.pachiku); // States for editing the pachiku

    const { data: session } = useSession(); // Get the current session and user context
    const { user: currentUser } = useUserContext(); // Get the current session and user context
    const { refreshPachikuData } = usePachikuContext(); // Get the current session and user context

    useEffect(() => {
        if (!session || !session.user) {
            setInitialHeartState(false);
        }
    }, [session]); // Authorization: If the user signs out, revert the heart state to false

    useEffect(() => {
        getAuthor(pachiku).then((authorData) => setAuthor(authorData));
    }, [pachiku]); // Fetch the author information

    useEffect(() => {
        if (author && currentUser) {
            getUserLikesPachiku(currentUser.id, pachiku.id).then((data) => {
                setInitialHeartState(data);
            });
        }
    }, [author, pachiku, currentUser]); // Fetch the initial heart (like) state

    const timeSince = getTimeSince(pachiku.createdAt); // Calculate the time since the Pachiku was created
    if (!author) return null;
    const imageLink = author.image || "/icons/no-image-icon.svg";

    // The update handler is defined here instead of within the Three Dots Menu component because it needs to interact with the visibility state of the edit form.
    async function handleUpdatePachiku(formData: FormData) {
        if (
            !session ||
            !session.user ||
            !currentUser ||
            !author ||
            currentUser.id !== author.id
        ) {
            throw new Error("Unauthorized action");
        } // Authorization
        try {
            await updatePachiku(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setEditFormVisible(false);
            refreshPachikuData();
        }
    }

    return (
        <PachikuContext.Provider value={pachiku}>
            <li className={styles.pachiku} key={pachiku.id}>
                {/* Body of the Pachiku: name, username, time, and the Pachiku text */}
                <section className={styles.body}>
                    <UserInfoContainer
                        author={author}
                        imageLink={imageLink}
                        timeSince={timeSince}
                        currentUser={currentUser}
                        setEditFormVisible={setEditFormVisible}
                    />

                    {/* Update pachiku form */}
                    {editFormVisible ? (
                        <EditPachikuForm
                            updatePachiku={handleUpdatePachiku}
                            editFormVisible={editFormVisible}
                            editedPachiku={editedPachiku}
                            setEditedPachiku={setEditedPachiku}
                            pachikuId={pachiku.id}
                            setEditFormVisible={setEditFormVisible}
                        />
                    ) : (
                        <p className={styles.pachikuText}>{pachiku.pachiku}</p>
                    )}
                </section>

                {/* Likes, comments, and share section */}
                <LikesCommentsShare
                    initialHeartState={initialHeartState}
                    pachiku={pachiku}
                />
            </li>
        </PachikuContext.Provider>
    );
}

// Export the context for use in other components
export { PachikuContext };
