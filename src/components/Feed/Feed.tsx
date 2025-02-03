import AllTweets from "../AllTweets/AllTweets";
import NewTweetForm from "../NewTweetForm/NewTweetForm";

export default function Feed() {
    return (
        <div>
            <h2>Feed</h2>
            <NewTweetForm />
            <AllTweets />
        </div>
    );
}
