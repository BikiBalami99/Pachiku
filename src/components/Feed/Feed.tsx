import { type Tweet } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default function Feed({ allTweets }: { allTweets: Tweet[] }) {
    return (
        <div>
            <h1>Today's Tweets</h1>
            {allTweets.map(async (tweet: Tweet) => {
                if (tweet.userId === null) return;
                const userId = tweet.userId.toString();
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                });

                return (
                    <div key={tweet.id}>
                        <h3>{user?.username}</h3>
                        <p>{tweet.tweet}</p>
                    </div>
                );
            })}
        </div>
    );
}
