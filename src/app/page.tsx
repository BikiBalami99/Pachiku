import NewTweetForm from "../components/NewTweetForm/NewTweetForm";
import Feed from "../components/Feed/Feed";
import { prisma } from "@/lib/prisma";
import { type Tweet } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
    const allTweets: Tweet[] = await prisma.tweet.findMany({
        include: {
            comments: true,
        },
    });
    const refreshTweets = () => {};
    return (
        <div>
            <NewTweetForm />
            <Link href="/signup">
                <button>Sign up</button>
            </Link>
            <Feed allTweets={allTweets} />
        </div>
    );
}
