"use client";
import { useState } from "react";
import { submitTweet } from "./submitTweet";

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="newTweet">New Tweet</label>
            <br />
            <input type="text" name="newTweet" id="newTweet" defaultValue="" />
            <button type="submit">Tweet</button>
            {feedback && <p>{feedback}</p>}
        </form>
    );
}
