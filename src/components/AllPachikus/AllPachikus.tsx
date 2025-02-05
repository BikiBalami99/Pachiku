import { prisma } from "@/lib/prisma";
import Pachiku from "../Pachiku/Pachiku";

export default async function AllPachikus() {
    const allPachikus = await prisma.pachiku.findMany({
        include: {
            comments: true, // Include comments in the query
        },
    });

    return (
        <div>
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
                        // <li key={pachiku.id}>
                        //     <h3>{user.name}</h3> <p>{pachiku.tweet}</p>
                        //     <p>{pachiku.likes} likes</p>
                        //     <button>Like</button>
                        //     <h4>Comments</h4>
                        //     <ul>
                        //         {pachiku.comments.length > 0
                        //             ? pachiku.comments.map((comment) => (
                        //                   <li key={comment.id}>
                        //                       <p>{comment.comment}</p>
                        //                   </li>
                        //               ))
                        //             : "No comments yet"}
                        //     </ul>
                        // </li>
                        <Pachiku />
                    );
                })}
            </ul>
        </div>
    );
}
