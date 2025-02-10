"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { fetchUser } from "@/utils/fetchUser";

// This is the server-action for submitting a pachiku
export async function submitPachiku(
    formdata: FormData
): Promise<{ error?: string; success?: boolean }> {
    const pachikuText = formdata.get("newPachiku")!.toString();

    try {
        const session = await getServerSession();
        if (!session) {
            return { error: "Please sign in" };
        }

        if (!session.user || !session.user.email) {
            return { error: "Something wrong with your account." };
        }

        const userEmail: string = session.user.email;

        const user = await fetchUser(userEmail);
        if (!user) {
            return {
                error: "User invalid, please sign out and sign in again.",
            };
        }

        await prisma.pachiku.create({
            data: {
                pachiku: pachikuText,
                userId: user.id,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating pachiku:", error);
        return { error: "Error creating pachiku" };
    }
}
