"use client";
import { useState } from "react";
import { submitPachiku } from "./submitPachiku";
import styles from "./NewPachikuForm.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function NewPachikuForm() {
    const [feedback, setFeedback] = useState<string | null>(null);
    const { data: session } = useSession();
    if (!session || !session.user) {
        return <h1>Please sign in</h1>;
    }
    const { user } = session;
    const userAvatarLink = user.image || "/icons/no-avatar-icon.svg";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await submitPachiku(formData);
        if (response.error) {
            setFeedback(response.error);
        } else if (response.success) {
            setFeedback("Pachiku submitted successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.newPachikuForm}>
            <div className={styles.imageAndForm}>
                <Image
                    src={userAvatarLink}
                    alt="Avatar of the user"
                    width={52}
                    height={52}
                    className={styles.image}
                />
                <input
                    type="text"
                    name="newPachiku"
                    id="newPachiku"
                    defaultValue=""
                    placeholder="How was your day?"
                    className={styles.inputForm}
                />
            </div>
            <div className={styles.feedbackAndButton}>
                {feedback && <p>{feedback}</p>}
                <button className="button primaryButton" type="submit">
                    Pachiku
                </button>
            </div>
        </form>
    );
}
