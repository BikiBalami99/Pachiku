import { Tweet } from "@/types";

export default function Feed({ allTweets }: { allTweets: Tweet[] }) {
    return (
        <div>
            <h1>Today's Tweets</h1>
            {allTweets.map((tweet: Tweet) => {
                return (
                    <div key={tweet.id}>
                        <h2>
                            {tweet.user ? tweet.user.username : "Anonymous"}
                        </h2>
                        <p>{tweet.tweet}</p>
                    </div>
                );
            })}
        </div>
    );
}
