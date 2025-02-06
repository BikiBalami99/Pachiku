import { prisma } from "@/lib/prisma";
import Pachiku from "../APachikuComponents/Pachiku/Pachiku";

export default async function AllPachikus() {
    const allPachikus = await prisma.pachiku.findMany({
        include: {
            comments: true, // Include comments in the query
        },
    });

    return (
        <section>
            <ul>
                {allPachikus.map(async (pachiku) => {
                    // Assert that pachiku.userId exists
                    if (!pachiku.userId) {
                        throw new Error("pachiku.userId does not exist");
                    }

                    const user = await prisma.user.findUnique({
                        where: {
                            id: pachiku.userId.toString(),
                        },
                    });

                    if (!user) return;
                    return (
                        <Pachiku
                            key={pachiku.id}
                            user={user}
                            pachiku={pachiku}
                        />
                    );
                })}
            </ul>
        </section>
    );
}
