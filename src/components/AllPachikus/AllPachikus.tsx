import { fetchAllPachikus } from "@/utils/getPachiku";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";
import { type PachikuWithDetails } from "@/types/pachiku";
import { getServerSession } from "next-auth";
import { getUserByUserId } from "@/utils/getUser";
import { randomUUID } from "crypto";
import { authOptions } from "@/lib/auth";

export default async function AllPachikus() {
    const allPachikus: PachikuWithDetails[] = await fetchAllPachikus();
    const session = await getServerSession(authOptions);
    if (!session) return <h2>Please sign in to see Pachikus.</h2>;

    return (
        <ul>
            {allPachikus.map(async (pachiku) => {
                const author = await getUserByUserId(pachiku.userId);
                if (author.error)
                    // IDK why this needs a key but the app wont build without it
                    return <h2 key={randomUUID()}>{author.error}</h2>;

                return (
                    <Pachiku
                        key={pachiku.id}
                        author={author.data}
                        currentUser={session.user}
                        pachiku={pachiku}
                    />
                );
            })}
        </ul>
    );
}
