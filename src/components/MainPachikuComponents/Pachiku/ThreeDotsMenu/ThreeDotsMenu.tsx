"use client";

import React, {
    useState,
    useContext,
    useRef,
    useEffect,
    useCallback,
} from "react";
import { PachikuContext } from "@/components/MainPachikuComponents/Pachiku/Pachiku";
import styles from "./ThreeDotsMenu.module.css";
import { useUserContext } from "@/contexts/UserContext";
import { deletePachiku } from "../pachikuActions/deletePachiku";
import { usePachikuContext } from "@/contexts/PachikuContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// ALWAYS use this inside a container with the css, position absolute where you want to put this component

export default function ThreeDotsMenu({
    actionForEdit,
}: {
    actionForEdit: () => void;
}) {
    const [fullMenuVisibility, setFullMenuVisibility] = useState(false);
    const pachikuContext = useContext(PachikuContext);
    const { data: session } = useSession();
    const { user: currentUser } = useUserContext();
    const { refreshPachikuData } = usePachikuContext();
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const hideDeleteModal = useCallback(() => {
        if (dialogRef.current) {
            setIsDialogOpen(false);
            dialogRef.current.close();
        }
    }, []);

    useEffect(() => {
        const dialog = dialogRef.current;

        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") {
                hideDeleteModal();
            }
        }

        if (dialog) dialog.addEventListener("keydown", handleEsc);
        return () => {
            if (dialog) dialog.removeEventListener("keydown", handleEsc);
        };
    }, [hideDeleteModal]);

    function toggleFullMenuVisibility() {
        setFullMenuVisibility((prev) => !prev);
    }

    function onClickEdit() {
        actionForEdit();
        setFullMenuVisibility(false);
    }

    function showDeleteModal() {
        if (dialogRef.current) {
            setIsDialogOpen(false);
            dialogRef.current.showModal();
            setFullMenuVisibility(false);
        }
    }

    // The delete handler is placed here instead of with the edit handler in the main Pachiku component because it doesn't need to be shared like the edit handler.
    async function handleDeletePachiku(formData: FormData) {
        if (
            !session ||
            !session.user ||
            !currentUser ||
            !pachikuContext ||
            currentUser.id !== pachikuContext.userId
        ) {
            console.log("session", session);
            console.log("currentUser", currentUser);
            console.log("pachikuContext", pachikuContext);
            throw new Error("Unauthorized action");
        } // Authorization

        try {
            await deletePachiku(formData);
            refreshPachikuData();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setFullMenuVisibility(false);
        }
    }

    return (
        <div>
            <div
                onClick={toggleFullMenuVisibility}
                className={styles.threeDotsMenu}
            >
                <span>&bull;</span>
                <span>&bull;</span>
                <span>&bull;</span>
            </div>
            <div
                data-visibility={fullMenuVisibility ? "visible" : "invisible"}
                className={styles.fullMenu}
            >
                <div className={styles.editButton} onClick={onClickEdit}>
                    Edit
                </div>
                <div onClick={showDeleteModal}>Delete</div>
            </div>

            {/* Confirm delete modal */}
            <dialog
                ref={dialogRef}
                className={styles.deleteModal}
                open={isDialogOpen}
            >
                <div className={styles.modalContent}>
                    <h1>Are you sure you want to delete this Pachiku?</h1>
                    <p>{pachikuContext?.pachiku}</p>

                    <div className={styles.buttons}>
                        <form method="dialog">
                            <button
                                className="button primaryButton"
                                onClick={hideDeleteModal}
                                aria-label="Cancel"
                            >
                                Cancel
                            </button>
                        </form>
                        <form action={handleDeletePachiku}>
                            <input
                                type="hidden"
                                name="pachikuId"
                                value={pachikuContext?.id}
                            />
                            <input
                                type="hidden"
                                name="currentUserId"
                                value={currentUser?.id}
                            />
                            <button className="button redButton" type="submit">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
