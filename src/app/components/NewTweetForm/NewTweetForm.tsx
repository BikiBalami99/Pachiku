export default function NewTweetForm() {
    return (
        <form action="">
            <label htmlFor="newTweet">New Tweet</label>
            <input type="text" name="newTweet" id="newTweet" />
            <button type="submit">Tweet</button>
        </form>
    );
}
