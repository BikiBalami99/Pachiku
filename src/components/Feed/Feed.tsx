import AllTweets from "../AllTweets/AllTweets";
import NewTweetForm from "../NewTweetForm/NewTweetForm";
import styles from "./Feed.module.css";

export default function Feed() {
    return (
        <div className={styles.feed}>
            <NewTweetForm />
            <AllTweets />
        </div>
    );
}
