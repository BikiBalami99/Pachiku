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
    
    if (!session) return <p>Please sign in to Tweet</p>;
    return (
        <div>
            <Link href="/signup">
                <button>Sign up</button>
            </Link>
            <NewTweetForm />
            <Feed allTweets={allTweets} />
        </div>
    );
}
