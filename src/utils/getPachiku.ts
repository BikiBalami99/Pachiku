import { PachikuWithDetails } from "@/types/pachiku";
import { User } from "@prisma/client";
import { getUserLikesPachiku } from "./getUserLikesPachiku";

export async function getSpecificPachiku(pachikuId: string) {
    // Get specific pachiku when provided a pachikuId
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
export async function getSpecificPachikuClient(pachikuId: string) {
    // client side only
    // Get specific pachiku when provided a pachikuId
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

export async function getAllPachikus() {
    // client side only
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-pachikus`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch Pachikus");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching Pachikus from ${url}:`, error);
        return null;
    }
}

// Used only in user's dashboard or another user's dashboard
export async function getPachikuOfUser(
    user: User,
    currentUser: User
): Promise<{
    pachikus: PachikuWithDetails[];
    userLikes: { [pachikuId: string]: boolean };
}> {
    // client side only
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-pachikus-of-user?userId=${user.id}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch all pachikus of user.");
    }

    try {
        const pachikus: PachikuWithDetails[] = await response.json();
        let userLikes: { [pachikuId: string]: boolean } = {};

        if (currentUser) {
            const likes = await Promise.all(
                pachikus.map((pachiku: PachikuWithDetails) =>
                    getUserLikesPachiku(currentUser.id, pachiku.id).catch(
                        (error) => {
                            console.error(
                                `Error fetching like status for pachiku ${pachiku.id}: ${error}`
                            );
                        }
                    )
                )
            );

            // populates the userLikes with objects with each key being a pachikuId and its value as boolean whether current user likes that pachiku or not
            userLikes = pachikus.reduce(
                (
                    acc: { [pachikuId: string]: boolean },
                    pachiku: PachikuWithDetails,
                    index: number
                ) => {
                    if (likes[index] !== null) {
                        acc[pachiku.id] = !!likes[index];
                    }
                    return acc;
                },
                {} as { [pachikuId: string]: boolean } // Explicit initial value type
            );
        }

        return { pachikus, userLikes };
    } catch (error) {
        console.error("Error fetching pachikus:", error);
        throw error; // Re-throw the error to be handled by the component
    }
}
