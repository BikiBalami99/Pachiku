"use client";
import { useState } from "react";
import { submitPachiku } from "./submitPachiku";
import styles from "./NewPachikuForm.module.css";

export default function NewPachikuForm() {
    const [feedback, setFeedback] = useState<string | null>(null);

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
                <div className={styles.image}></div>
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
