"use client";
import { useState } from "react";
import { submitPachiku } from "./submitPachiku";
import styles from "./NewPachikuForm.module.css";
import { useSession } from "next-auth/react";
import UserImage from "../APachikuComponents/UserImage/UserImage";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function NewPachikuForm() {
    const [feedback, setFeedback] = useState<string | null>(null);
    const { data: session } = useSession();
    if (!session || !session.user) {
        return (
            <div className={styles.notSignedInNotice}>
                <h2>Cant Pachiku just yet!</h2>

                <hr />
                <SignUpForm />
            </div>
        );
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
                <UserImage
                    src={userAvatarLink}
                    userFirstName={"current user"}
                />
                <textarea
                    name="newPachiku"
                    id="newPachiku"
                    defaultValue=""
                    placeholder="How was your day?"
                    className={styles.inputForm}
                    maxLength={256}
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
