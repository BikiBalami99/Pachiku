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
        try {
            await createComment(formData);

            refreshPachikuData();
        } catch (error) {
            console.log(error);
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

            <button className="button primaryButton" type="submit">
                Comment
            </button>
        </form>
    );
}
