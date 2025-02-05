"use client";
import { useState } from "react";
import { submitTweet } from "./submitTweet";
import styles from "./NewTweetForm.module.css";

export default function NewTweetForm() {
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await submitTweet(formData);
        if (response.error) {
            setFeedback(response.error);
        } else if (response.success) {
            setFeedback("Tweet submitted successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.newTweetForm}>
            <div className={styles.imageAndForm}>
                <div className={styles.image}></div>
                <input
                    type="text"
                    name="newTweet"
                    id="newTweet"
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
