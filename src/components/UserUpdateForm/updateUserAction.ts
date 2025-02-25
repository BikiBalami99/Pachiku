"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// To update user info in dashboard
type UpdateUserResult =
    | { success: false; error: string }
    | { success: true; message: string };

export async function updateUser(
    formData: FormData
): Promise<UpdateUserResult> {
    "use server";
    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const username = formData.get("username")?.toString();
    const id = formData.get("id")?.toString();

    if (!firstName || !lastName || !username || !id) {
        return {
            error: "Failed to receive information to updateUser.",
            success: false,
        };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser && existingUser.id !== id) {
            return { error: "Username already taken.", success: false };
        }

        await prisma.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                username,
            },
        });

        revalidatePath("/dashboard");
        return { message: "Successful", success: true };
    } catch (error) {
        return {
            error: `Something went wrong while trying to update user. ${error}`,
            success: false,
        };
    }
}
