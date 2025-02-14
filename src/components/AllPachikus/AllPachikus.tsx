import { getAllPachikus } from "@/utils/getPachiku";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PachikuWithDetails } from "@/types/pachiku";

export default async function AllPachikus() {
    const allPachikus = await getAllPachikus();
    const session = await getServerSession(authOptions);

    if (!session) {
        return <h2>Please sign in</h2>;
    }

    // const author = await getAuthor()

    return (
        <ul>
            {allPachikus.map(async (pachiku: PachikuWithDetails) => {
                return (
                    <Pachiku
                        key={pachiku.id}
                        pachiku={pachiku}
                        currentUser={session.user}
                    />
                );
            })}
        </ul>
    );
}
