"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function submitPachiku(formData: FormData) {
    try {
        // Validation of the input
        if (!(formData instanceof FormData)) {
            throw new Error("Error, only formdata type allowed");
        }
        const pachikuText = formData.get("newPachiku");
        if (!pachikuText) throw new Error("New Pachiku Required");

        // Validating again if user is signed in
        const session = await getServerSession(authOptions);

        if (!session) redirect("/api/auth/signin");
        if (!session.user || !session.user.email) {
            throw new Error("Unauthorized account.");
        }

        const currentUserEmail = session.user.email;

        // Contacting the API
        const createNewPachikuResponse = await fetch(
            `${process.env.NEXTAUTH_URL}/api/pachiku`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pachikuText, email: currentUserEmail }),
            }
        );

        // If failed response
        if (!createNewPachikuResponse.ok) {
            const errorData = await createNewPachikuResponse.json();
            return {
                success: false,
                error:
                    errorData.error ||
                    "Unknown error during POST request in the submit pachiku function.",
            };
        }

        // If OK response
        const responseData = await createNewPachikuResponse.json();

        // used for redirect
        const newPachiuId = responseData.data.id;

        return {
            success: true,
            data: newPachiuId,
            error: null,
        };
    } catch (error) {
        console.log("Error creating new pachiku:");
        return { success: false, data: null, error: error };
    }
}
