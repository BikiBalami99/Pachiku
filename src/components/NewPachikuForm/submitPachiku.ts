"use server";
import { authOptions } from "@/lib/auth";
import { Pachiku } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface SubmitPachikuResponseType {
    success?: boolean;
    error?: string;
    data?: Pachiku;
}

// This is the server-action for submitting a pachiku
export async function submitPachiku(
    formdata: FormData
): Promise<SubmitPachikuResponseType> {
    const pachikuText = formdata.get("newPachiku")!.toString();

    try {
        const session = await getServerSession(authOptions);

        // Edge cases handling
        if (!session) {
            return { success: false, error: "Please sign in" };
        }

        if (!session.user) {
            return {
                success: false,
                error: "Session.user does not exist",
            };
        }

        const userId = session.user.id;
        const createPachikuResponse = await fetch(
            `${process.env.NEXTAUTH_URL}/api/pachiku`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pachikuText, userId }),
            }
        );

        // If failed response
        if (!createPachikuResponse.ok) {
            const errorData = await createPachikuResponse.json();
            return {
                success: false,
                error:
                    errorData.error ||
                    "Unknown error during POST request in the submit pachiku function.",
            };
        }

        // If OK response
        const responseData = await createPachikuResponse.json();
        revalidatePath("/");

        return {
            success: true,
            data: responseData,
        };
    } catch (error) {
        console.error("Error creating pachiku:", error);
        return { error: "Error creating pachiku" };
    }
}
