import { getAllPachikus } from "@/utils/getPachiku";
import { getUserLikesPachiku } from "@/utils/getUserLikesPachiku";
import { PachikuWithDetails } from "@/types/pachiku";
import { User } from "@prisma/client";

// Use to populate all pachikus in the main feed. Has the pachiku info + whether the current user likes that pachiku or not
export async function getAllPachikuData(currentUser: User | null): Promise<{
    pachikus: PachikuWithDetails[];
    userLikes: { [pachikuId: string]: boolean };
}> {
    try {
        const pachikus = await getAllPachikus();
        let userLikes: { [pachikuId: string]: boolean } = {};

        if (currentUser) {
            const likes = await Promise.all(
                pachikus.map((pachiku: PachikuWithDetails) =>
                    getUserLikesPachiku(currentUser.id, pachiku.id).catch(
                        (error) => {
                            console.error(
                                `Error fetching like status for pachiku ${pachiku.id}:`,
                                error
                            );
                            return null;
                        }
                    )
                )
            );

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
