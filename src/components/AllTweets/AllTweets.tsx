import { prisma } from "@/lib/prisma";

export default async function AllTweets() {
    const allTweets = await prisma.tweet.findMany({
        include: {
            comments: true, // Include comments in the query
        },
    });

    return (
        <div>
            <ul>
                {allTweets.map(async (tweet) => {
                    // Assert that tweet.userId exists
                    if (!tweet.userId) {
                        throw new Error("tweet.userId does not exist");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            id: tweet.userId.toString(),
                        },
                    });
                    if (!user) return;
                    return (
                        <li key={tweet.id}>
                            <h3>{user.name}</h3> <p>{tweet.tweet}</p>
                            <p>{tweet.likes} likes</p>
                            <button>Like</button>
                            <h4>Comments</h4>
                            <ul>
                                {tweet.comments.length > 0
                                    ? tweet.comments.map((comment) => (
                                          <li key={comment.id}>
                                              <p>{comment.comment}</p>
                                          </li>
                                      ))
                                    : "No comments yet"}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
