// "use server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { revalidatePath } from "next/cache";

// // This is the server-action for submitting a tweet
// export async function submitTweet(formdata: FormData) {
//     const tweetText = formdata.get("newTweet")!.toString();

//     try {
//         const session = await getServerSession();
//         if (!session || !session.user) throw new Error("Please sign in");

//         const userEmail: string = session.user.email!;
//         const user = await prisma.user.findUnique({
//             where: { email: userEmail },
//         });

//         if (!user) throw new Error("User not found");

//         const newTweet = await prisma.tweet.create({
//             data: {
//                 tweet: tweetText,
//                 userId: user.id,
//                 createdAt: new Date(),
//             },
//         });

//         revalidatePath("/");
//     } catch (error) {
//         console.error("Error creating tweet:", error);
//     }
// }
