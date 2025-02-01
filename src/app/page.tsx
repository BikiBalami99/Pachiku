import NewTweetForm from "../components/NewTweetForm/NewTweetForm";
import Feed from "../components/Feed/Feed";
import { prisma } from "@/lib/prisma";
import { type Tweet } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function Home() {
    const allTweets: Tweet[] = await prisma.tweet.findMany({
        include: {
            comments: true,
        },
    });
    const session = await getServerSession();

    if (!session)
        return (
            <div>
                <p>Please sign in or sign up to Tweet</p>
                <Link href="/signup">
                    <button>Sign up</button>
                </Link>
            </div>
        );
    return (
        <div>
            <NewTweetForm />
            <Feed allTweets={allTweets} />
        </div>
    );
}
