import NewTweetForm from "./components/NewTweetForm/NewTweetForm";
import Feed from "./components/Feed/Feed";
import prisma from "@/lib/prisma";
import { Tweet } from "@/types";

export default async function Home() {
    const allTweets: Tweet[] = await prisma.tweet.findMany();
    const refreshTweets = () => {};
    return (
        <div>
            <NewTweetForm />
            <Feed allTweets={allTweets} />
        </div>
    );
}
