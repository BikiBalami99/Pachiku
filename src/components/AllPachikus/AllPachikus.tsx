import { fetchAllPachikus } from "@/utils/fetchAllPachikus";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { type PachikuWithDetails } from "@/types/pachiku";
import { fetchUser } from "@/utils/fetchUser";

export default async function AllPachikus() {
    let allPachikus: PachikuWithDetails[];

    try {
        allPachikus = await fetchAllPachikus();
    } catch (error) {
        console.error("Error fetching Pachikus:", error);
        return <p>Error loading Pachikus.</p>;
    }
    return (
        <section>
            <ul>
                {await Promise.all(
                    allPachikus.map(async (pachiku: PachikuWithDetails) => {
                        if (!pachiku.userId) {
                            throw new Error("pachiku.userId does not exist");
                        }

                        const user = await fetch(
                            `${process.env.NEXTAUTH_URL}/api/user?userId=${pachiku.userId}`
                        );
                        if (!user.ok) return null;

                        const userData = await user.json();

                        return (
                            <Pachiku
                                key={pachiku.id}
                                user={userData}
                                pachiku={pachiku}
                            />
                        );
                    })
                )}
            </ul>
        </section>
    );
}
