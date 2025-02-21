import { PachikuWithDetails } from "@/types/pachiku";
import { User } from "@prisma/client";

// This file has all the functions that relates to providing the pachikus of any kind

// Get specific pachiku when provided a pachikuId (server side only)
export async function getSpecificPachiku(pachikuId: string) {
    const url = `${process.env.NEXTAUTH_URL}/api/pachiku?pachikuId=${pachikuId}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                return null; // Return null if the Pachiku isn't found
            }
            throw new Error(`Failed to fetch Pachiku: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching specific Pachiku from ${url}:`, error);
        return null;
    }
}

// Get specific pachiku when provided a pachikuId (client side only)
export async function getSpecificPachikuClient(
    pachikuId: string
): Promise<PachikuWithDetails | null> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/pachiku?pachikuId=${pachikuId}`;
    try {
        const response = await fetch(url);
        console.log("Response:", response);
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Return null if the Pachiku isn't found
            }
            throw new Error(`Failed to fetch Pachiku: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching specific Pachiku from ${url}:`, error);
        return null;
    }
}

// Get all pachikus in our database
export async function getAllPachikus(): Promise<PachikuWithDetails[] | null> {
    // client side only
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-pachikus`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch Pachikus");
        }
        const data: PachikuWithDetails[] = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Pachikus from ${url}:`, error);
        return null;
    }
}

// Used only in user's dashboard or another user's dashboard (in the future)
export async function getPachikuOfUser(
    user: User
): Promise<PachikuWithDetails[]> {
    // client side only
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-pachikus-of-user?userId=${user.id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch all pachikus of user.");
        }
        const pachikus: PachikuWithDetails[] = await response.json();
        return pachikus;
    } catch (error) {
        console.error("Error fetching pachikus:", error);
        throw error; // Re-throw the error to be handled by the component
    }
}
