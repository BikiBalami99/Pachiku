"use client";
import { submitTweet } from "./submitTweet";

export default function NewTweetForm() {
    return (
        <form action={submitTweet}>
            <label htmlFor="newTweet">New Tweet</label>
            <input type="text" name="newTweet" id="newTweet" defaultValue="" />
            <button type="submit">Tweet</button>
        </form>
    );
}
