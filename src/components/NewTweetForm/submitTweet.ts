"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitTweet(formdata: FormData) {
    "use server";

    const newTweet = formdata.get("newTweet");
    console.log("Form data:", newTweet);

    if (newTweet) {
        const newTweetString: string = newTweet.toString();
        try {
            const response = await prisma.tweet.create({
                data: {
                    tweet: newTweetString,
                },
            });
            console.log("Tweet created:", response.tweet);

            revalidatePath("/");
        } catch (error) {
            console.error("Error creating tweet:", error);
        }
    } else {
        console.error("Tweet content is missing");
    }
}
