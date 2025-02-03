"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// This is the server-action for submitting a tweet
export async function submitTweet(
    formdata: FormData
): Promise<{ error?: string; success?: boolean }> {
    const tweetText = formdata.get("newTweet")!.toString();

    try {
        const session = await getServerSession();
        if (!session) {
            return { error: "Please sign in" };
        }

        if (!session.user || !session.user.email) {
            return { error: "Something wrong with your account." };
        }

        const userEmail: string = session.user.email;

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return {
                error: "User invalid, please sign out and sign in again.",
            };
        }

        await prisma.tweet.create({
            data: {
                tweet: tweetText,
                userId: user.id,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating tweet:", error);
        return { error: "Error creating tweet" };
    }
}
