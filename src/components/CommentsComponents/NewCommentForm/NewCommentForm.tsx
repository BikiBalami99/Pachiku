"use client";

import { useState, useEffect } from "react";
import { createComment } from "../commentActions/commentActions";
import { User, type Pachiku as PachikuType } from "@prisma/client";
import styles from "./NewCommentForm.module.css";
import { getUserByEmail } from "@/utils/getUser";
import UserImage from "@/components/MainPachikuComponents/UserImage/UserImage";
import { useSession } from "next-auth/react";
import { usePachikuContext } from "@/contexts/PachikuContext";

export default function NewCommentForm({ pachiku }: { pachiku: PachikuType }) {
    const { data: session } = useSession();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<React.ReactNode>("Comment");
    const [success, setSuccess] = useState(false);
    const { refreshPachikuData } = usePachikuContext();

    useEffect(() => {
        async function fetchUser() {
            if (session && session.user) {
                const user = await getUserByEmail(session.user.email);
                setCurrentUser(user);
            }
        }
        fetchUser();
    }, [session]);

    if (!session || !session.user || !currentUser)
        return (
            <div className={styles.commentForm}>
                <h2>Please sign in to comment</h2>
            </div>
        );

    async function submitCommentHandler(formData: FormData) {
        await setSubmitting(true);
        setMessage(
            <>
                <div className={styles.spinner}></div>
                <span>Commenting...</span>
            </>
        );
        try {
            await createComment(formData);
            refreshPachikuData();
            setSubmitting(false);
            setMessage("Commented!");
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            setMessage("Error");
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setMessage("Comment");
                setSuccess(false);
            }, 3000);
        }
    }

    return (
        <form action={submitCommentHandler} className={styles.commentForm}>
            <input type="hidden" name="pachikuId" value={pachiku.id} />
            <div className={styles.imageAndInput}>
                <UserImage
                    src={currentUser.image}
                    userFirstName={currentUser.firstName}
                />
                <input
                    type="text"
                    name="newComment"
                    id="newComment"
                    placeholder="New Comment"
                    required
                />
            </div>

            <button
                className="button primaryButton"
                type="submit"
                disabled={submitting}
            >
                {success ? (
                    <>
                        <svg
                            className={styles.successTick}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Commented!
                    </>
                ) : (
                    message
                )}
            </button>
        </form>
    );
}
